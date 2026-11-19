import {
  assertSameOrigin,
  clearAdminSessionCookie,
} from '../_lib/adminAuth.js';
import { json } from '../_lib/supabaseAdmin.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    json(res, 405, { ok: false, error: 'Method not allowed' });
    return;
  }

  if (!assertSameOrigin(req)) {
    json(res, 403, { ok: false, error: 'Origem não permitida.' });
    return;
  }

  clearAdminSessionCookie(res);
  json(res, 200, { ok: true });
}
