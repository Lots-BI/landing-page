/**
 * Server-only lead proxy for Vercel.
 * Browser → POST /api/lead → Lots BI CRM (never exposes LOTS_FORMS_TOKEN).
 */

const FORM_KEY = 'landing-lotsbi';

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

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

  if (!nome) {
    return { error: 'Informe seu nome.' };
  }

  if (!email && !instagram && !telefone) {
    return { error: 'Informe e-mail, Instagram ou telefone.' };
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Informe um e-mail válido.' };
  }

  const payload = {
    nome,
    form_key: FORM_KEY,
  };

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

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    json(res, 405, { ok: false, error: 'Method not allowed' });
    return;
  }

  const formsUrl = process.env.LOTS_FORMS_URL;
  const formsToken = process.env.LOTS_FORMS_TOKEN;

  if (!formsUrl || !formsToken) {
    console.error('[api/lead] LOTS_FORMS_URL / LOTS_FORMS_TOKEN missing');
    json(res, 500, { ok: false, error: 'Configuração do servidor incompleta.' });
    return;
  }

  let body;
  try {
    if (typeof req.body === 'string') {
      body = req.body ? JSON.parse(req.body) : {};
    } else if (Buffer.isBuffer(req.body)) {
      const raw = req.body.toString('utf8');
      body = raw ? JSON.parse(raw) : {};
    } else if (typeof req.body === 'object' && req.body != null) {
      body = req.body;
    } else {
      body = await readBody(req);
    }
  } catch {
    json(res, 400, { ok: false, error: 'JSON inválido.' });
    return;
  }

  const { payload, error } = validatePayload(body);
  if (error) {
    json(res, 400, { ok: false, error });
    return;
  }

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
      console.error('[api/lead] CRM submit failed', upstream.status, text.slice(0, 500));
      json(res, upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502, {
        ok: false,
        error: data?.error || data?.message || 'Não foi possível enviar o formulário.',
      });
      return;
    }

    json(res, 200, {
      ok: true,
      submissionId: data?.submissionId ?? null,
      personId: data?.personId ?? null,
      deduped: Boolean(data?.deduped),
    });
  } catch (err) {
    console.error('[api/lead] upstream error', err);
    json(res, 502, { ok: false, error: 'Falha ao falar com o CRM. Tente novamente.' });
  }
}
