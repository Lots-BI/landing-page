const SUBMITTED_KEY = 'lots_landing_submitted';
const ACCEPTED_KEY = 'lots_downsell_accepted';

function setFlag(key) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(key, '1');
  } catch {
    // ignore private mode
  }
}

export function markLandingSubmitted() {
  setFlag(SUBMITTED_KEY);
}

export function markDownsellAccepted() {
  setFlag(ACCEPTED_KEY);
}

export function canShowDownsell() {
  if (typeof window === 'undefined') return false;
  try {
    return !sessionStorage.getItem(SUBMITTED_KEY) && !sessionStorage.getItem(ACCEPTED_KEY);
  } catch {
    return false;
  }
}
