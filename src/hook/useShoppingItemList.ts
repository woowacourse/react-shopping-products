import { useEffect, useState } from 'react';
import { CategoryOption, Product, SortOption } from '../types/common';
import { ProductListResponse } from '../types/response';
import { apiRequest } from '../api/apiRequest';

const useShoppingItemList = () => {
  const [selected, setSelected] = useState<SortOption>('낮은 가격순');
  const [category, setCategory] = useState<CategoryOption>('전체');
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      setError(null);

      try {
        const response = await apiRequest<ProductListResponse>(
          `/products?page=0&size=20${
            category === '전체' ? '' : `&category=${category}`
          }${
            selected === '높은 가격순' ? '&sort=price,desc' : '&sort=price,asc'
          }`
        );

        setData(response.content);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError(
          new Error('상품 목록을 불러오는데 실패했습니다. 다시 시도해주세요.')
        );
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category, selected]);

  const handleSortClick = (content: string) => {
    setSelected(content as SortOption);
  };

  const handleCategoryClick = (category: string) => {
    setCategory(category as CategoryOption);
  };

  const retryFetch = () => {
    setSelected((prev) => prev);
  };

  return {
    data,
    handleSortClick,
    handleCategoryClick,
    selected,
    category,
    error,
    isLoading,
    retryFetch,
  };
};

export default useShoppingItemList;
