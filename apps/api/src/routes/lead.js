/**
 * Local/dev mirror of /api/lead (Vite proxies here in development).
 */
const FORM_KEY = 'landing-lotsbi';

function trim(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function validatePayload(body) {
  const nome = trim(body?.nome);
  const email = trim(body?.email);
  const instagram = trim(body?.instagram);
  const telefone = trim(body?.telefone);
  const mensagem = trim(body?.mensagem);
  const page_url = trim(body?.page_url);
  const utm_source = trim(body?.utm_source);
  const utm_campaign = trim(body?.utm_campaign);
  const utm_medium = trim(body?.utm_medium);
  const utm_content = trim(body?.utm_content);
  const utm_term = trim(body?.utm_term);

  if (!nome) return { error: 'Informe seu nome.' };
  if (!email && !instagram && !telefone) {
    return { error: 'Informe e-mail, Instagram ou telefone.' };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Informe um e-mail válido.' };
  }

  const payload = { nome, form_key: FORM_KEY };
  if (email) payload.email = email;
  if (instagram) payload.instagram = instagram;
  if (telefone) payload.telefone = telefone;
  if (mensagem) payload.mensagem = mensagem;
  if (page_url) payload.page_url = page_url;
  if (utm_source) payload.utm_source = utm_source;
  if (utm_campaign) payload.utm_campaign = utm_campaign;
  if (utm_medium) payload.utm_medium = utm_medium;
  if (utm_content) payload.utm_content = utm_content;
  if (utm_term) payload.utm_term = utm_term;
  return { payload };
}

export default async function lead(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const formsUrl = process.env.LOTS_FORMS_URL;
  const formsToken = process.env.LOTS_FORMS_TOKEN;
  if (!formsUrl || !formsToken) {
    console.error('[lead] LOTS_FORMS_URL / LOTS_FORMS_TOKEN missing');
    return res.status(500).json({ ok: false, error: 'Configuração do servidor incompleta.' });
  }

  const { payload, error } = validatePayload(req.body);
  if (error) return res.status(400).json({ ok: false, error });

  try {
    const upstream = await fetch(formsUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${formsToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const text = await upstream.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }

    if (!upstream.ok) {
      console.error('[lead] CRM submit failed', upstream.status, text.slice(0, 500));
      return res.status(upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502).json({
        ok: false,
        error: data?.error || data?.message || 'Não foi possível enviar o formulário.',
      });
    }

    return res.status(200).json({
      ok: true,
      submissionId: data?.submissionId ?? null,
      personId: data?.personId ?? null,
      deduped: Boolean(data?.deduped),
    });
  } catch (err) {
    console.error('[lead] upstream error', err);
    return res.status(502).json({ ok: false, error: 'Falha ao falar com o CRM. Tente novamente.' });
  }
}
