import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useUTMs() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const utms = {
      utm_source: searchParams.get('utm_source'),
      utm_medium: searchParams.get('utm_medium'),
      utm_campaign: searchParams.get('utm_campaign'),
      utm_content: searchParams.get('utm_content'),
      utm_term: searchParams.get('utm_term'),
    };

    // Only save if at least one UTM is present to avoid overwriting existing session data with nulls
    const hasUtms = Object.values(utms).some(val => val !== null);
    
    if (hasUtms) {
      sessionStorage.setItem('utm_data', JSON.stringify(utms));
    }
  }, [searchParams]);

  const getUTMs = () => {
    try {
      const stored = sessionStorage.getItem('utm_data');
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error parsing UTM data from sessionStorage:', error);
      return {};
    }
  };

  return getUTMs;
}