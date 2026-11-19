/**
 * Client → POST /api/lead (server da landing) → CRM Lots BI.
 * Admin → POST /api/admin/* (server) → RPC admin_* (sem chave no browser).
 */

function readStoredUtms() {
  try {
    const raw = localStorage.getItem('utm_data');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function saveLandingLead({
  nome,
  email,
  instagram,
  telefone,
  mensagem,
  source,
}) {
  const utms = readStoredUtms();

  const response = await fetch('/api/lead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      nome,
      email,
      instagram,
      telefone,
      mensagem,
      source,
      page_url: typeof window !== 'undefined' ? window.location.href : undefined,
      utm_source: utms.utm_source,
      utm_campaign: utms.utm_campaign,
      utm_medium: utms.utm_medium,
      utm_content: utms.utm_content,
      utm_term: utms.utm_term,
    }),
  });

  const data = await readJson(response);

  if (!response.ok || !data?.ok) {
    throw new Error(data?.error || 'Não foi possível enviar o formulário. Tente novamente.');
  }

  return data;
}

export async function adminLogin(password) {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ password }),
  });

  const data = await readJson(response);
  if (!response.ok || !data?.ok || !data?.token) {
    throw new Error(data?.error || 'Falha ao entrar.');
  }

  return { token: data.token, expires_at: data.expires_at };
}

export async function listFormsAsAdmin(token) {
  const response = await fetch('/api/admin/forms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  const data = await readJson(response);
  if (!response.ok || !data?.ok) {
    throw new Error(data?.error || 'Falha ao carregar formulários.');
  }

  return data.rows || [];
}

export async function adminLogout(token) {
  if (!token) return;
  try {
    await fetch('/api/admin/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ token }),
    });
  } catch {
    // best-effort
  }
}
