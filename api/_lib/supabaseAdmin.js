/**
 * Server-only Supabase helpers for /adm (RPC admin_*).
 * Never import from client code. Never use VITE_ keys.
 */

export function getSupabaseAdminConfig() {
  const url = process.env.SUPABASE_URL || process.env.LOTS_ADMIN_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.LOTS_ADMIN_SUPABASE_ANON_KEY;
  if (!url || !key) {
    const err = new Error('Admin Supabase não configurado no servidor.');
    err.status = 500;
    throw err;
  }
  return { url: url.replace(/\/$/, ''), key };
}

export function supabaseHeaders(key, extra = {}) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

export async function callAdminRpc(rpcName, body) {
  const { url, key } = getSupabaseAdminConfig();
  const response = await fetch(`${url}/rest/v1/rpc/${rpcName}`, {
    method: 'POST',
    headers: supabaseHeaders(key),
    body: JSON.stringify(body),
  });

  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text || null;
  }

  return { response, data, text };
}

export function mapAdminError(response, text, fallback) {
  if (/too_many_attempts/i.test(text || '')) {
    return 'Muitas tentativas. Aguarde alguns minutos e tente de novo.';
  }
  if (response.status === 401 || /unauthorized|42501/i.test(text || '')) {
    return 'Não autorizado.';
  }
  return fallback;
}

export function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    if (typeof req.body === 'string') {
      try {
        resolve(req.body ? JSON.parse(req.body) : {});
      } catch (error) {
        reject(error);
      }
      return;
    }
    if (Buffer.isBuffer?.(req.body)) {
      try {
        const raw = req.body.toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
      return;
    }
    if (typeof req.body === 'object' && req.body != null) {
      resolve(req.body);
      return;
    }

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

export function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}
