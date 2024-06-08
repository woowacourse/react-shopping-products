import { MouseEvent, useState } from 'react';

import { Category, SortOption } from '@/types/product';
import { isCategoryLabel, isProductCategory, isSortLabel, isSortValue } from '@/utils/typeGuard';
import { useQueryClient } from '@tanstack/react-query';

const useProductFilter = () => {
  const [category, setCategory] = useState<Category>({ label: '전체', value: 'all' });
  const [order, setOrder] = useState<SortOption>({ label: '낮은 가격순', value: 'asc' });
  const queryClient = useQueryClient();

  const handleChangeCategory = async (e: MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const targetValue = target.dataset.value;
    const targetLabel = target.innerText;

    const value = targetValue && isProductCategory(targetValue) ? targetValue : '';
    const label = isCategoryLabel(targetLabel) ? targetLabel : '';

    if (!label) return;
    if (!value) return;
    if (label === category.label) return;
    setCategory({ label, value });
    queryClient.invalidateQueries({ queryKey: ['fetchProductList', { category, order }] });
  };

  const handleChangeSort = async (e: MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const targetValue = target.dataset.value;
    const targetLabel = target.innerText;

    const value = targetValue && isSortValue(targetValue) ? targetValue : '';
    const label = isSortLabel(targetLabel) ? targetLabel : '';

    if (!label) return;
    if (!value) return;
    if (label === order.label) return;

    setOrder({ label, value });
    queryClient.invalidateQueries({ queryKey: ['fetchProductList', { category, order }] });
  };

  return { category, order, handleChangeCategory, handleChangeSort };
};

export default useProductFilter;
