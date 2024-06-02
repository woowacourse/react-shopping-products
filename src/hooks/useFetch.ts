import { useEffect, useState } from 'react';

import APIClient from '@apis/APIClient';

async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await APIClient.get(endpoint);
  const data = await response.json();

  APIClient.validateResponse(response, data.error);

  return data;
}

const useFetch = <T>(url: string, showToast?: (message: string) => void) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    setIsLoading(true);

    fetchData<T>(url)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        if (showToast) showToast(error.message);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url, showToast]);

  return { data, isLoading, error };
};

export default useFetch;
