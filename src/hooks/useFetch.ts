import APIClient from '@apis/APIClient';
import { useState, useEffect } from 'react';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function fetchData(endpoint: string) {
      const response = await APIClient.get(endpoint);
      const data = await response.json();

      return data;
    }

    try {
      // setIsLoading(true);

      fetchData(url).then((data: T) => {
        setData(data);
      });
    } catch (error) {
      // setError(error);
    } finally {
      // setIsLoading(false);
    }
  }, [url]);

  return { data };
};

export default useFetch;
