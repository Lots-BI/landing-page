export const WHATSAPP_PHONE = '5511973290438';

export const WHATSAPP_PRESET_MESSAGE =
  'Vim direto do site — quero falar sobre gestão de tráfego pago com o Leandro.';

export function buildWhatsAppHref(message = WHATSAPP_PRESET_MESSAGE) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
