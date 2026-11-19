import {
  callAdminRpc,
  json,
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

  let body = {};
  try {
    body = await readJsonBody(req);
  } catch {
    body = {};
  }

  const token = typeof body?.token === 'string' ? body.token.trim() : '';
  if (token) {
    try {
      await callAdminRpc('admin_logout', { p_token: token });
    } catch (err) {
      console.error('[api/admin/logout]', err);
    }
  }

  json(res, 200, { ok: true });
}
