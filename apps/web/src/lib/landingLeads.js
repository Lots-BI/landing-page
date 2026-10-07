/**
 * Grava o lead em landing_leads. Não lança erro: o WhatsApp segue mesmo se falhar.
 * Colunas: nome, email, instagram, created_at.
 */
export async function saveLandingLead({ nome, email, instagram }) {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return;

  try {
    const response = await fetch(`${url}/rest/v1/landing_leads`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ nome, email, instagram }),
    });
    if (!response.ok) {
      console.error('landing_leads insert failed', response.status);
    }
  } catch (error) {
    console.error('landing_leads insert failed', error);
  }
}
