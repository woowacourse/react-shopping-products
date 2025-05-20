import { useMemo } from 'react';
import { PRODUCT_URL } from '../constants/endpoint';
import getQueryURL from '../utils/getQueryURL';

const useProductQueryURL = ({ page = '0', size = '20', sortingType = '', filterType = '' }) => {
  const requestURL = useMemo(() => {
    const query = {
      page,
      size,
      ...(sortingType && { sort: `price,${sortingType}` }),
      ...(filterType && { category: filterType }),
    };
    return getQueryURL(PRODUCT_URL, query);
  }, [page, size, sortingType, filterType]);

  return { requestURL };
};

export default useProductQueryURL;
