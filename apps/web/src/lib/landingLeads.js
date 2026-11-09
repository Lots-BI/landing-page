/**
 * Client → POST /api/lead (server da landing) → CRM Lots BI.
 * Sem chave Supabase e sem token no browser.
 */

function readStoredUtms() {
  try {
    const raw = localStorage.getItem('utm_data');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export async function saveLandingLead({ nome, email, instagram, telefone, mensagem }) {
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
      page_url: typeof window !== 'undefined' ? window.location.href : undefined,
      utm_source: utms.utm_source,
      utm_campaign: utms.utm_campaign,
      utm_medium: utms.utm_medium,
      utm_content: utms.utm_content,
      utm_term: utms.utm_term,
    }),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok || !data?.ok) {
    throw new Error(data?.error || 'Não foi possível enviar o formulário. Tente novamente.');
  }

  return data;
}
