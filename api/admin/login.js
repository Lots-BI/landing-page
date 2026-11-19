import {
  assertSameOrigin,
  createAdminSession,
  getClientIp,
  isRateLimited,
  registerAttempt,
  setAdminSessionCookie,
  verifyAdminPassword,
} from '../_lib/adminAuth.js';
import { callAdminRpc, json, readJsonBody } from '../_lib/supabaseAdmin.js';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    json(res, 405, { ok: false, error: 'Method not allowed' });
    return;
  }

  if (!assertSameOrigin(req)) {
    json(res, 403, { ok: false, error: 'Origem não permitida.' });
    return;
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    json(res, 429, {
      ok: false,
      error: 'Muitas tentativas. Aguarde alguns minutos e tente de novo.',
    });
    return;
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    json(res, 400, { ok: false, error: 'JSON inválido.' });
    return;
  }

  const password = typeof body?.password === 'string' ? body.password : '';
  if (!password.trim()) {
    json(res, 400, { ok: false, error: 'Informe a senha.' });
    return;
  }

  try {
    const ok = verifyAdminPassword(password);
    // Keep DB session in sync for audit / legacy RPC list path.
    if (ok) {
      try {
        await callAdminRpc('admin_login', { p_password: password.trim() });
      } catch (err) {
        console.error('[api/admin/login] db session sync failed', err);
      }
    }

    await sleep(ok ? 50 : 400);

    if (!ok) {
      registerAttempt(ip, false);
      json(res, 401, { ok: false, error: 'Não autorizado.' });
      return;
    }

    registerAttempt(ip, true);
    const token = createAdminSession();
    setAdminSessionCookie(res, token);
    json(res, 200, { ok: true });
  } catch (err) {
    console.error('[api/admin/login]', err);
    json(res, err.status || 500, {
      ok: false,
      error: err.message || 'Falha ao entrar.',
    });
  }
}
