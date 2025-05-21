import { useState, useCallback } from 'react';
import { handleHTTPError } from '../utils';

export default function useFetch() {
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (url: string, options: RequestInit = {}) => {
    try {
      setLoading(true);
      const response = await fetch(url, options);
      await handleHTTPError(response);
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchData, loading };
}
