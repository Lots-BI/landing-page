import {
  assertSameOrigin,
  readAdminSession,
} from '../_lib/adminAuth.js';
import {
  callAdminRpc,
  getSupabaseAdminConfig,
  json,
  mapAdminError,
  supabaseHeaders,
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

async function listFormsViaPassword() {
  const password = String(process.env.LANDING_ADM_PASSWORD || '').trim();
  if (!password) {
    const err = new Error('LANDING_ADM_PASSWORD ausente.');
    err.status = 500;
    throw err;
  }

  const login = await callAdminRpc('admin_login', { p_password: password });
  if (!login.response.ok || !login.data?.token) {
    const err = new Error(
      mapAdminError(login.response, login.text, 'Falha ao abrir sessão de leitura.'),
    );
    err.status = 401;
    throw err;
  }

  const listed = await callAdminRpc('admin_list_forms', {
    p_token: login.data.token,
  });
  if (!listed.response.ok) {
    const err = new Error(
      mapAdminError(listed.response, listed.text, 'Falha ao carregar formulários.'),
    );
    err.status = listed.response.status === 401 ? 401 : 400;
    throw err;
  }

  return Array.isArray(listed.data) ? listed.data.map(normalizeRow) : [];
}

async function listFormsViaRestFallback() {
  const { url, key } = getSupabaseAdminConfig();
  const response = await fetch(
    `${url}/rest/v1/forms?select=id,created_at,nome,email,instagram,telefone,source,form_key,page_url,utm_source,utm_campaign,mensagem&or=(cadastro_cliente_id.eq.15,form_key.eq.landing-lotsbi,form_key.eq.default)&order=created_at.desc&limit=200`,
    {
      method: 'GET',
      headers: supabaseHeaders(key),
    },
  );
  const text = await response.text();
  if (!response.ok) {
    const err = new Error(mapAdminError(response, text, 'Falha ao carregar formulários.'));
    err.status = response.status;
    throw err;
  }
  const data = text ? JSON.parse(text) : [];
  return Array.isArray(data) ? data.map(normalizeRow) : [];
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    json(res, 405, { ok: false, error: 'Method not allowed' });
    return;
  }

  if (!assertSameOrigin(req)) {
    json(res, 403, { ok: false, error: 'Origem não permitida.' });
    return;
  }

  if (!readAdminSession(req)) {
    json(res, 401, { ok: false, error: 'Sessão inválida. Entre novamente.' });
    return;
  }

  try {
    let rows;
    try {
      rows = await listFormsViaPassword();
    } catch (err) {
      console.error('[api/admin/forms] rpc path failed, trying rest', err);
      rows = await listFormsViaRestFallback();
    }
    json(res, 200, { ok: true, rows });
  } catch (err) {
    console.error('[api/admin/forms]', err);
    json(res, err.status || 500, {
      ok: false,
      error: err.message || 'Falha ao carregar formulários.',
    });
  }
}
