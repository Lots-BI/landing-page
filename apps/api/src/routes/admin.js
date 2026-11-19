/**
 * Local/dev mirror of /api/admin/* (Vite proxies /api here).
 */
import {
  callAdminRpc,
  mapAdminError,
} from '../../../../api/_lib/supabaseAdmin.js';

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

export async function adminLogin(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  if (!password) {
    return res.status(400).json({ ok: false, error: 'Informe a senha.' });
  }

  try {
    const { response, data, text } = await callAdminRpc('admin_login', {
      p_password: password,
    });
    if (!response.ok || !data?.token) {
      return res.status(response.status === 429 ? 429 : 401).json({
        ok: false,
        error: mapAdminError(response, text, 'Falha ao entrar.'),
      });
    }
    return res.status(200).json({
      ok: true,
      token: data.token,
      expires_at: data.expires_at ?? null,
    });
  } catch (err) {
    console.error('[admin/login]', err);
    return res.status(err.status || 500).json({
      ok: false,
      error: err.message || 'Falha ao entrar.',
    });
  }
}

export async function adminForms(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const token = typeof req.body?.token === 'string' ? req.body.token.trim() : '';
  if (!token) {
    return res.status(401).json({ ok: false, error: 'Sessão inválida. Entre novamente.' });
  }

  try {
    const { response, data, text } = await callAdminRpc('admin_list_forms', {
      p_token: token,
    });
    if (!response.ok) {
      return res.status(response.status === 401 ? 401 : 400).json({
        ok: false,
        error: mapAdminError(response, text, 'Falha ao carregar formulários.'),
      });
    }
    return res.status(200).json({
      ok: true,
      rows: Array.isArray(data) ? data.map(normalizeRow) : [],
    });
  } catch (err) {
    console.error('[admin/forms]', err);
    return res.status(err.status || 500).json({
      ok: false,
      error: err.message || 'Falha ao carregar formulários.',
    });
  }
}

export async function adminLogout(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const token = typeof req.body?.token === 'string' ? req.body.token.trim() : '';
  if (token) {
    try {
      await callAdminRpc('admin_logout', { p_token: token });
    } catch (err) {
      console.error('[admin/logout]', err);
    }
  }
  return res.status(200).json({ ok: true });
}
