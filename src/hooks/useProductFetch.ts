import { useState, useEffect } from 'react';
import { fetchProducts } from '../api';
import { ProductType } from '../types';
import { formattedKey } from './useProducts.util';
import { useToast } from './useToast';
import { calculatePageParams } from '../utils/calculatePageParams';

export function useProductFetch() {
  const [selectBarCondition, setSelectBarCondition] = useState({
    category: 'all',
    sort: 'priceAsc',
  });
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
  }, [selectBarCondition.category, selectBarCondition.sort]);

  const handleSelectBarCondition = (filter: string, condition: string) => {
    const newCondition = { ...selectBarCondition, [filter]: condition };
    setSelectBarCondition(newCondition);
  };

  const fetchMoreProducts = async () => {
    try {
      setIsLoading(true);
      const { size, queryPage } = calculatePageParams(page);
      const newProducts = await fetchProducts({
        page: queryPage,
        size,
        category: selectBarCondition.category,
        sort: formattedKey(selectBarCondition.sort),
      });
      setProducts((prev) => [...prev, ...newProducts]);
      setHasMore(newProducts.length > 0);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        showToast('상품 목록을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreProducts();
  }, [page, selectBarCondition.category, selectBarCondition.sort]);

  return { products, setPage, hasMore, isLoading, handleSelectBarCondition, selectBarCondition };
}
