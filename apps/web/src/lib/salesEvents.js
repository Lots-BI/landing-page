export function trackDownsellView(offer) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'downsell_view', offer });
}

export function trackDownsellAccept(offer) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'downsell_accept', offer });
}
