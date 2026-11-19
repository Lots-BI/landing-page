/**
 * Client → POST /api/lead (server da landing) → CRM Lots BI.
 * Admin → /api/admin/* com cookie httpOnly (sem chave e sem token no JS).
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
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ password: String(password || '').trim() }),
  });

  const data = await readJson(response);
  if (!response.ok || !data?.ok) {
    throw new Error(data?.error || 'Falha ao entrar.');
  }

  return { ok: true };
}

export async function listFormsAsAdmin() {
  const response = await fetch('/api/admin/forms', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });

  const data = await readJson(response);
  if (!response.ok || !data?.ok) {
    throw new Error(data?.error || 'Falha ao carregar formulários.');
  }

  return data.rows || [];
}

export async function adminLogout() {
  try {
    await fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
    });
  } catch {
    // best-effort
  }
}
