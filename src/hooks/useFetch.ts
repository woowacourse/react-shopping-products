import { useEffect, useState } from 'react';
import { useToastContext } from '@components/common/Toast/provider/ToastProvider';

import APIClient from '@apis/APIClient';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastContext();

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
      .catch((error) => {
        showToast(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url, showToast]);

  return { data, isLoading };
};

export default useFetch;
