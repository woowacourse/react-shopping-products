import { MouseEvent, useState } from 'react';

import { Category, SortOption } from '@/types/product';
import { isCategoryLabel, isProductCategory, isSortLabel, isSortValue } from '@/utils/typeGuard';

const useProductDropdown = (resetPage: () => void) => {
  const [category, setCategory] = useState<Category>({ label: '전체', value: 'all' });
  const [order, setOrder] = useState<SortOption>({ label: '낮은 가격순', value: 'asc' });

  const handleChangeCategory = async (e: MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const targetValue = target.dataset.value;
    const targetLabel = target.innerText;

    const value = targetValue && isProductCategory(targetValue) ? targetValue : '';
    const label = isCategoryLabel(targetLabel) ? targetLabel : '';

    if (!label) return;
    if (!value) return;

    setCategory({ label, value });
    resetPage();
  };

  const handleChangeSort = async (e: MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const targetValue = target.dataset.value;
    const targetLabel = target.innerText;

    const value = targetValue && isSortValue(targetValue) ? targetValue : '';
    const label = isSortLabel(targetLabel) ? targetLabel : '';

    if (!label) return;
    if (!value) return;

    setOrder({ label, value });
    resetPage();
  };

  return { category, order, handleChangeCategory, handleChangeSort };
};

export default useProductDropdown;
