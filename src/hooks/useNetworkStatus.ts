import { useEffect } from 'react';

import useToast from './useToast';

import { ERROR_MESSAGE } from '@/constants/error';

const useNetworkStatus = () => {
  const toast = useToast();

  useEffect(() => {
    const handleOffline = () => toast.error(ERROR_MESSAGE['NETWORK_ERROR']);

    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
};

export default useNetworkStatus;
