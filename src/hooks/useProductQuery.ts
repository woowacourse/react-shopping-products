import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api';
import { formattedKey } from './useProducts.util';

interface Props {
  selectBarCondition: Record<string, string>;
}

const useProductQuery = ({ selectBarCondition }: Props) => {
  const params = {
    category: selectBarCondition.category,
    page: 0,
    size: 20,
    sort: formattedKey(selectBarCondition.sort),
  };
  return useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(params),
  });
};

export default useProductQuery;
