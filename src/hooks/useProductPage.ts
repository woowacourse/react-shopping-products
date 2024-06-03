import { useEffect, useState } from 'react';

import useNetworkStatus from './useNetworkStatus';
import useToast from './useToast';

import { PAGE_SIZE } from '@/constants/config';
import { ERROR_MESSAGE } from '@/constants/error';

const useProductPage = () => {
  const [page, setPage] = useState(0);
  const [retryPage, setRetryPage] = useState(-1);
  const [isLastPage, setIsLastPage] = useState(false);

  const toast = useToast();
  const { isOnline } = useNetworkStatus();

  const fetchNextPage = () => {
    const nextPageUnit = page === 0 ? PAGE_SIZE.firstPageUnit : PAGE_SIZE.nextPageUnit;

    if (isLastPage) return;
    if (!isOnline) {
      setRetryPage(page + 1);
      toast.error(ERROR_MESSAGE['NETWORK_ERROR']);
      return;
    }

    setPage((prevPage) => prevPage + nextPageUnit);
  };

  const determineLastPage = (last: boolean) => {
    if (last) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  };

  const resetPage = () => {
    setPage(0);
  };

  useEffect(() => {
    if (isOnline && retryPage !== -1) {
      setPage(retryPage);
      setRetryPage(-1);
    }
  }, [isOnline, retryPage]);

  return { page, fetchNextPage, determineLastPage, resetPage };
};

export default useProductPage;
