#!/usr/bin/env node
/**
 * Cross-platform production build (Windows/macOS/Linux).
 * Avoids shell operators like `|| true &&` that break under cmd.exe.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const webRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(webRoot, '../..');
const viteBin = path.join(repoRoot, 'node_modules', 'vite', 'bin', 'vite.js');
const outDir = path.join(repoRoot, 'dist', 'apps', 'web');
const prerenderDir = path.join(webRoot, '.prerender');

const llms = spawnSync(process.execPath, [path.join(webRoot, 'tools', 'generate-llms.js')], {
	cwd: webRoot,
	stdio: 'inherit',
});

if (llms.status !== 0) {
	console.warn('[build] generate-llms.js failed; continuing with vite build.');
}

const build = spawnSync(
	process.execPath,
	[viteBin, 'build', '--outDir', '../../dist/apps/web'],
	{
		cwd: webRoot,
		stdio: 'inherit',
		env: process.env,
	},
);

if (build.status !== 0) process.exit(build.status ?? 1);

try {
	await prerenderHome();
} catch (error) {
	console.warn('[build] prerender failed; shipping the client-only index.html.', error);
} finally {
	fs.rmSync(prerenderDir, { recursive: true, force: true });
}

/**
 * Ships "/" as static HTML that main.jsx hydrates, so LCP does not wait for the JS bundle.
 * Other routes drop the markup before first paint and render client-side as before.
 */
async function prerenderHome() {
	const ssr = spawnSync(
		process.execPath,
		[viteBin, 'build', '--ssr', 'src/entry-prerender.jsx', '--outDir', '.prerender', '--emptyOutDir'],
		{
			cwd: webRoot,
			stdio: 'inherit',
			env: { ...process.env, NODE_ENV: 'production' },
		},
	);
	if (ssr.status !== 0) throw new Error('SSR build failed');

	const entry = fs.readdirSync(prerenderDir).find((file) => /^entry-prerender\.m?js$/.test(file));
	const { render } = await import(pathToFileURL(path.join(prerenderDir, entry)).href);
	const markup = render();

	const indexPath = path.join(outDir, 'index.html');
	let html = fs.readFileSync(indexPath, 'utf8');
	if (!html.includes('<div id="root"></div>')) throw new Error('#root placeholder not found');

	const dropOnOtherRoutes = `<script>if(location.pathname!=='/')document.getElementById('root').innerHTML='';</script>`;
	html = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>${dropOnOtherRoutes}`);

	const assets = fs.readdirSync(path.join(outDir, 'assets'));
	const preloads = [/^urbanist-latin-wght-normal-.*\.woff2$/, /^epilogue-latin-wght-normal-.*\.woff2$/]
		.map((pattern) => assets.find((file) => pattern.test(file)))
		.filter(Boolean)
		.map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin>`)
		.join('\n\t\t');
	if (preloads) html = html.replace('</title>', `</title>\n\t\t${preloads}`);

	// Start the bundle once the static page has been presented (first-contentful-paint); hydration then reuses those DOM nodes.
	const entryTag = html.match(/<script type="module" crossorigin src="(\/assets\/index-[^"]+\.js)"><\/script>\s*/);
	if (entryTag) {
		html = html.replace(entryTag[0], '').replace(/<link rel="modulepreload"[^>]*>\s*/g, '');
		const loader = `<script>(function(){var done=false;function go(){if(done)return;done=true;var s=document.createElement('script');s.type='module';s.crossOrigin='';s.src='${entryTag[1]}';document.body.appendChild(s);}
try{new PerformanceObserver(function(list,obs){if(list.getEntriesByName('first-contentful-paint').length){obs.disconnect();setTimeout(go,0);}}).observe({type:'paint',buffered:true});}
catch(e){requestAnimationFrame(function(){setTimeout(go,0);});}
setTimeout(go,3000);})();</script>`;
		html = html.replace('</body>', `${loader}\n\t</body>`);
	}

	fs.writeFileSync(indexPath, html);
	console.log('[build] prerendered "/" into index.html');
}
