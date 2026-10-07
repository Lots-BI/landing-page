/** Lots BI / Agência Lots — identidade alinhada ao supabase-magic-portal. */

export const BRAND_NAME = 'Agência Lots';
export const BRAND_PRODUCT = 'Lots BI';
export const BRAND_TAGLINE = 'Business Intelligence para marketing digital';
export const BRAND_DESCRIPTION =
  'Agência Lots — marketing digital com operação, dados e previsibilidade.';

export const BRAND_COLORS = {
  purple: '#A855F7',
  blue: '#60A5FA',
  lotsText: '#2C2E3B',
  lotsTextDark: '#E4E0EC',
  slate: '#334155',
  background: '#000000',
};

export const BRAND_ASSETS = {
  logoFull: '/brand/lockup.png',
  icon: '/brand/petala.png',
  logoBi: '/brand/bi.png',
  logoLots: '/brand/lots.png',
  favicon: '/favicon.png',
  ogImage: 'https://lotsbi.leandromajr.com/og-image.png',
};

export function brandTitle(section) {
  return `${section} · ${BRAND_NAME}`;
}
