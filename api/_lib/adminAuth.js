import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const COOKIE_NAME = 'lots_adm_session';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60 * 1000;

/** @type {Map<string, { count: number, resetAt: number }>} */
const attempts = new Map();

function getExpectedPassword() {
  return String(process.env.LANDING_ADM_PASSWORD || '').trim();
}

function getSessionSecret() {
  return (
    process.env.LANDING_ADM_SECRET ||
    process.env.LOTS_FORMS_TOKEN ||
    process.env.SUPABASE_ANON_KEY ||
    ''
  );
}

export function getClientIp(req) {
  const forwarded = req.headers?.['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || req.headers?.['x-real-ip'] || 'unknown';
}

export function isRateLimited(ip) {
  const now = Date.now();
  const row = attempts.get(ip);
  if (!row) return false;
  if (now > row.resetAt) {
    attempts.delete(ip);
    return false;
  }
  return row.count >= MAX_ATTEMPTS;
}

export function registerAttempt(ip, succeeded) {
  const now = Date.now();
  if (succeeded) {
    attempts.delete(ip);
    return;
  }
  const row = attempts.get(ip);
  if (!row || now > row.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  row.count += 1;
}

function safeEqualString(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) {
    timingSafeEqual(left, Buffer.alloc(left.length));
    return false;
  }
  return timingSafeEqual(left, right);
}

export function verifyAdminPassword(password) {
  const expected = getExpectedPassword();
  const provided = String(password || '').trim();
  if (!expected) {
    const err = new Error('Senha admin não configurada no servidor (LANDING_ADM_PASSWORD).');
    err.status = 500;
    throw err;
  }
  return safeEqualString(provided, expected);
}

function b64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function fromB64url(input) {
  const pad = input.length % 4 === 0 ? '' : '='.repeat(4 - (input.length % 4));
  return Buffer.from(String(input).replace(/-/g, '+').replace(/_/g, '/') + pad, 'base64').toString(
    'utf8',
  );
}

export function createAdminSession() {
  const secret = getSessionSecret();
  if (!secret) {
    const err = new Error('Segredo de sessão admin ausente.');
    err.status = 500;
    throw err;
  }
  const payload = {
    v: 1,
    sid: randomBytes(16).toString('hex'),
    exp: Date.now() + SESSION_TTL_MS,
  };
  const body = b64url(JSON.stringify(payload));
  const sig = createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${sig}`;
}

export function verifyAdminSession(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const secret = getSessionSecret();
  if (!secret) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = createHmac('sha256', secret).update(body).digest('base64url');
  if (!safeEqualString(sig, expected)) return null;
  try {
    const payload = JSON.parse(fromB64url(body));
    if (!payload?.exp || Date.now() > Number(payload.exp)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function parseCookies(req) {
  const header = req.headers?.cookie;
  if (!header || typeof header !== 'string') return {};
  return Object.fromEntries(
    header.split(';').map((part) => {
      const idx = part.indexOf('=');
      if (idx === -1) return [part.trim(), ''];
      return [
        part.slice(0, idx).trim(),
        decodeURIComponent(part.slice(idx + 1).trim()),
      ];
    }),
  );
}

export function readAdminSession(req) {
  const cookies = parseCookies(req);
  return verifyAdminSession(cookies[COOKIE_NAME] || '');
}

export function setAdminSessionCookie(res, token) {
  const maxAge = Math.floor(SESSION_TTL_MS / 1000);
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`,
  );
}

export function clearAdminSessionCookie(res) {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
  );
}

export function assertSameOrigin(req) {
  const origin = req.headers?.origin;
  const host = req.headers?.host;
  if (!origin || !host) return true; // non-browser or same-origin navigations
  try {
    const originHost = new URL(origin).host;
    return originHost === host || originHost.replace(/^www\./, '') === host.replace(/^www\./, '');
  } catch {
    return false;
  }
}

export { COOKIE_NAME };
