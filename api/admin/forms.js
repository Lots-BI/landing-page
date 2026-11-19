import {
  callAdminRpc,
  json,
  mapAdminError,
  readJsonBody,
} from '../_lib/supabaseAdmin.js';

function normalizeRow(row) {
  return {
    id: row.id,
    created_at: row.created_at,
    nome: row.nome || '—',
    email: row.email || '—',
    instagram: row.instagram || '—',
    telefone: row.telefone || '—',
    source: row.source || row.form_key || '—',
    form_key: row.form_key || null,
    page_url: row.page_url || null,
    utm_source: row.utm_source || null,
    utm_campaign: row.utm_campaign || null,
    mensagem: row.mensagem || null,
  };
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

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    json(res, 400, { ok: false, error: 'JSON inválido.' });
    return;
  }

  const token = typeof body?.token === 'string' ? body.token.trim() : '';
  if (!token) {
    json(res, 401, { ok: false, error: 'Sessão inválida. Entre novamente.' });
    return;
  }

  try {
    const { response, data, text } = await callAdminRpc('admin_list_forms', {
      p_token: token,
    });

    if (!response.ok) {
      json(res, response.status === 401 ? 401 : 400, {
        ok: false,
        error: mapAdminError(response, text, 'Falha ao carregar formulários.'),
      });
      return;
    }

    const rows = Array.isArray(data) ? data.map(normalizeRow) : [];
    json(res, 200, { ok: true, rows });
  } catch (err) {
    console.error('[api/admin/forms]', err);
    json(res, err.status || 500, {
      ok: false,
      error: err.message || 'Falha ao carregar formulários.',
    });
  }
}
