import {
  callAdminRpc,
  json,
  mapAdminError,
  readJsonBody,
} from '../_lib/supabaseAdmin.js';

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

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    json(res, 400, { ok: false, error: 'JSON inválido.' });
    return;
  }

  const password = typeof body?.password === 'string' ? body.password : '';
  if (!password) {
    json(res, 400, { ok: false, error: 'Informe a senha.' });
    return;
  }

  try {
    const { response, data, text } = await callAdminRpc('admin_login', {
      p_password: password,
    });

    if (!response.ok || !data?.token) {
      json(res, response.status === 429 ? 429 : 401, {
        ok: false,
        error: mapAdminError(response, text, 'Falha ao entrar.'),
      });
      return;
    }

    json(res, 200, {
      ok: true,
      token: data.token,
      expires_at: data.expires_at ?? null,
    });
  } catch (err) {
    console.error('[api/admin/login]', err);
    json(res, err.status || 500, {
      ok: false,
      error: err.message || 'Falha ao entrar.',
    });
  }
}
