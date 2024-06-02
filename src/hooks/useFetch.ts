import { useEffect, useState } from 'react';

import APIClient from '@apis/APIClient';

const useFetch = <T>(url: string, errorHandler?: (message: string) => void) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function fetchData(endpoint: string) {
      const response = await APIClient.get(endpoint);
      const data = await response.json();

      APIClient.validateResponse(response, data.error);

      return data;
    }
    setIsLoading(true);

    fetchData(url)
      .then((data: T) => {
        setData(data);
      })
      .catch(error => {
        if (errorHandler) errorHandler(error.message);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url, errorHandler]);

  return { data, isLoading, error };
};

export default useFetch;
