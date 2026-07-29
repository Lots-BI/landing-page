import { useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const UTM_STORAGE_KEY = 'utm_data';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

function readStoredUtms() {
  try {
    const fromLocal = localStorage.getItem(UTM_STORAGE_KEY);
    if (fromLocal) return JSON.parse(fromLocal);

    // Migrate legacy sessionStorage → localStorage (return visitors / attribution)
    const fromSession = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (fromSession) {
      localStorage.setItem(UTM_STORAGE_KEY, fromSession);
      return JSON.parse(fromSession);
    }
  } catch (error) {
    console.error('Error reading UTM data:', error);
  }
  return {};
}

function writeStoredUtms(utms) {
  const payload = JSON.stringify(utms);
  try {
    localStorage.setItem(UTM_STORAGE_KEY, payload);
    sessionStorage.setItem(UTM_STORAGE_KEY, payload);
  } catch (error) {
    console.error('Error saving UTM data:', error);
  }
}

/**
 * Captures UTM params from the URL and persists them in localStorage
 * so return visitors keep campaign attribution for conversions.
 */
export function useUTMs() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const utms = {};
    let hasUtms = false;

    for (const key of UTM_KEYS) {
      const value = searchParams.get(key);
      if (value) {
        utms[key] = value;
        hasUtms = true;
      }
    }

    // Merge new URL UTMs into stored data (keeps prior keys when missing from URL)
    if (hasUtms) {
      const existing = readStoredUtms();
      writeStoredUtms({ ...existing, ...utms });
    }
  }, [searchParams]);

  const getUTMs = useCallback(() => readStoredUtms(), []);

  /** Append UTM summary to a WhatsApp / CTA message for offline attribution */
  const appendUtmsToMessage = useCallback((baseMessage) => {
    const utms = readStoredUtms();
    const parts = UTM_KEYS
      .filter((key) => utms[key])
      .map((key) => `${key}=${utms[key]}`);

    if (parts.length === 0) return baseMessage;
    return `${baseMessage}\n\n[Origem: ${parts.join(' | ')}]`;
  }, []);

  return { getUTMs, appendUtmsToMessage };
}
