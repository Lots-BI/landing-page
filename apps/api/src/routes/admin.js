/**
 * Local/dev mirror of /api/admin/* (Vite proxies /api here).
 */
import {
  assertSameOrigin,
  clearAdminSessionCookie,
  createAdminSession,
  getClientIp,
  isRateLimited,
  readAdminSession,
  registerAttempt,
  setAdminSessionCookie,
  verifyAdminPassword,
} from '../../../../api/_lib/adminAuth.js';
import { callAdminRpc, mapAdminError } from '../../../../api/_lib/supabaseAdmin.js';

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
  if (!assertSameOrigin(req)) {
    return res.status(403).json({ ok: false, error: 'Origem não permitida.' });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({
      ok: false,
      error: 'Muitas tentativas. Aguarde alguns minutos e tente de novo.',
    });
  }

  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  if (!password.trim()) {
    return res.status(400).json({ ok: false, error: 'Informe a senha.' });
  }

  try {
    const ok = verifyAdminPassword(password);
    if (ok) {
      try {
        await callAdminRpc('admin_login', { p_password: password.trim() });
      } catch (err) {
        console.error('[admin/login] db session sync failed', err);
      }
    }
    if (!ok) {
      registerAttempt(ip, false);
      return res.status(401).json({ ok: false, error: 'Não autorizado.' });
    }
    registerAttempt(ip, true);
    const token = createAdminSession();
    setAdminSessionCookie(res, token);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[admin/login]', err);
    return res.status(err.status || 500).json({
      ok: false,
      error: err.message || 'Falha ao entrar.',
    });
  }
}

export async function adminForms(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  if (!assertSameOrigin(req)) {
    return res.status(403).json({ ok: false, error: 'Origem não permitida.' });
  }
  if (!readAdminSession(req)) {
    return res.status(401).json({ ok: false, error: 'Sessão inválida. Entre novamente.' });
  }

  try {
    const password = String(process.env.LANDING_ADM_PASSWORD || '').trim();
    const login = await callAdminRpc('admin_login', { p_password: password });
    if (!login.response.ok || !login.data?.token) {
      return res.status(401).json({
        ok: false,
        error: mapAdminError(login.response, login.text, 'Falha ao abrir sessão de leitura.'),
      });
    }
    const listed = await callAdminRpc('admin_list_forms', {
      p_token: login.data.token,
    });
    if (!listed.response.ok) {
      return res.status(listed.response.status === 401 ? 401 : 400).json({
        ok: false,
        error: mapAdminError(listed.response, listed.text, 'Falha ao carregar formulários.'),
      });
    }
    return res.status(200).json({
      ok: true,
      rows: Array.isArray(listed.data) ? listed.data.map(normalizeRow) : [],
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
  clearAdminSessionCookie(res);
  return res.status(200).json({ ok: true });
}
