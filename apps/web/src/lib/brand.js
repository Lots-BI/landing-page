/** Lots BI / Agência Lots — identidade alinhada ao supabase-magic-portal. */

export const BRAND_NAME = 'Agência Lots';
export const BRAND_PRODUCT = 'Lots BI';
export const BRAND_TAGLINE = 'Business Intelligence para marketing digital';
export const BRAND_DESCRIPTION =
  'Agência Lots — marketing digital com operação, dados e previsibilidade.';

const SUPABASE_MEDIA_BASE =
  'https://ywvhoctcmibjitvwkkhb.supabase.co/storage/v1/object/public/Midias';

export const BRAND_COLORS = {
  purple: '#A855F7',
  blue: '#60A5FA',
  lotsText: '#2C2E3B',
  lotsTextDark: '#E4E0EC',
  slate: '#334155',
  background: '#000000',
};

export const BRAND_ASSETS = {
  logoFull: `${SUPABASE_MEDIA_BASE}/1.png`,
  icon: `${SUPABASE_MEDIA_BASE}/Logo%20SVG/2.svg`,
  logoBi: `${SUPABASE_MEDIA_BASE}/3.png`,
  logoLots: `${SUPABASE_MEDIA_BASE}/4.png`,
  favicon: `${SUPABASE_MEDIA_BASE}/2.png`,
  ogImage: `${SUPABASE_MEDIA_BASE}/1.png`,
};

export function brandTitle(section) {
  return `${section} · ${BRAND_NAME}`;
}
