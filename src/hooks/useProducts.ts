import getProducts, { GetProductsProps } from '../api/getProducts';
import { useDataContext } from '../components/contexts/dataContext';

type UseProductsProps = {
  category?: '전체' | '패션잡화' | '식료품';
  priceOrder?: '낮은 가격순' | '높은 가격순';
};
const useProducts = ({ category, priceOrder }: UseProductsProps) => {
  const {
    data: products,
    refetch: fetchProducts,
    isLoading,
    error,
  } = useDataContext({
    fetcher: getProducts,
    key: 'products',
    fetcherParams: {
      category,
      priceOrder,
    } as GetProductsProps,
  });
  console.log('products', products);
  return {
    products,
    error,
    isLoading,
    fetchProducts,
  };
};

export default useProducts;
