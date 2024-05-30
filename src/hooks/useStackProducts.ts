import { fetchProduct } from '@apis/index';
import { Filtering, Product } from '@appTypes/index';

interface UseStackProductsProps {
  fetch: (...args: Parameters<typeof fetchProduct>) => Promise<
    | Promise<{
        products: Product[];
        isLast: boolean;
      }>
    | undefined
  >;
  products: Product[];
  filtering: Filtering;
}

function useStackProducts({ fetch, products, filtering }: UseStackProductsProps) {
  /**
   * 무한 스크롤 시 상품 목록을 추가해서 넣어주는 기능
   */
  const getStackedProducts = async (page: number) => {
    const newPage = page + 1;
    const result = await fetch({ filtering, page: newPage });

    if (result === undefined) return;

    return {
      isLast: result.isLast,
      newProducts: [...products, ...result.products],
      newPage,
    };
  };

  return {
    getStackedProducts,
  };
}

export default useStackProducts;
