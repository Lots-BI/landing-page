#!/usr/bin/env node
/**
 * Cross-platform production build (Windows/macOS/Linux).
 * Avoids shell operators like `|| true &&` that break under cmd.exe.
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const webRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(webRoot, '../..');
const viteBin = path.join(repoRoot, 'node_modules', 'vite', 'bin', 'vite.js');

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

process.exit(build.status ?? 1);
