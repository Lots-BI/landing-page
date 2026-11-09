/**
 * Leads da landing → tabela `forms` no Supabase (Lots BI).
 * Frontend usa apenas a anon key + RLS (INSERT). Leitura admin só via sessão opaca.
 */

function getSupabaseConfig() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Supabase não configurado (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).');
  }
  return { url, key };
}

function supabaseHeaders(key, extra = {}) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

async function readErrorMessage(response, fallback) {
  const detail = await response.text().catch(() => '');
  if (/too_many_attempts/i.test(detail)) {
    return 'Muitas tentativas. Aguarde alguns minutos e tente de novo.';
  }
  if (response.status === 401 || /unauthorized|42501/i.test(detail)) {
    return 'Não autorizado.';
  }
  return fallback;
}

/** Grava lead público. Não lança detalhes internos. */
export async function saveLandingLead({ nome, email, instagram }) {
  const { url, key } = getSupabaseConfig();

  const response = await fetch(`${url}/rest/v1/forms`, {
    method: 'POST',
    headers: supabaseHeaders(key, { Prefer: 'return=minimal' }),
    body: JSON.stringify({
      nome,
      email,
      instagram,
      source: 'landing',
      page_url: typeof window !== 'undefined' ? window.location.href : null,
    }),
  });

  if (!response.ok) {
    throw new Error('Não foi possível enviar o formulário. Tente novamente.');
  }
}

/** Login admin: valida senha no banco e devolve token opaco (a senha não é persistida no browser). */
export async function adminLogin(password) {
  const { url, key } = getSupabaseConfig();

  const response = await fetch(`${url}/rest/v1/rpc/admin_login`, {
    method: 'POST',
    headers: supabaseHeaders(key),
    body: JSON.stringify({ p_password: password }),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, 'Falha ao entrar.'));
  }

  const data = await response.json();
  if (!data?.token) {
    throw new Error('Resposta de login inválida.');
  }
  return data;
}

/** Lista envios com token de sessão (nunca com a senha). */
export async function listFormsAsAdmin(token) {
  const { url, key } = getSupabaseConfig();

  const response = await fetch(`${url}/rest/v1/rpc/admin_list_forms`, {
    method: 'POST',
    headers: supabaseHeaders(key),
    body: JSON.stringify({ p_token: token }),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, 'Falha ao carregar formulários.'));
  }

  return response.json();
}

export async function adminLogout(token) {
  if (!token) return;
  const { url, key } = getSupabaseConfig();
  try {
    await fetch(`${url}/rest/v1/rpc/admin_logout`, {
      method: 'POST',
      headers: supabaseHeaders(key),
      body: JSON.stringify({ p_token: token }),
    });
  } catch {
    // best-effort
  }
}
