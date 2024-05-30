import { fetchProduct } from '@src/apis';
import { Filtering, Product } from '@src/appTypes';

interface UseFilteredProductsProps {
  fetch: (...args: Parameters<typeof fetchProduct>) => Promise<
    | Promise<{
        products: Product[];
        isLast: boolean;
      }>
    | undefined
  >;
  filtering: Filtering;
}

const useFilteredProducts = ({ fetch, filtering }: UseFilteredProductsProps) => {
  /**
   * 필터링이 변했을 때 상품 목록을 가져오는 기능
   */
  const getFilteredProducts = async () => {
    const result = await fetch({ filtering });
    if (result === undefined) return;

    return {
      isLast: result.isLast,
      newProducts: result.products,
      newPage: 0,
    };
  };

  return {
    getFilteredProducts,
  };
};

export default useFilteredProducts;
