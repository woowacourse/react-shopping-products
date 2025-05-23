import { useState } from 'react';
import { CATEGORY } from '../constants/products';
import { SORT } from '../components/Filter/Filter';

export function useProductFilter() {
  const [category, setCategory] = useState(CATEGORY[0]);
  const [sort, setSort] = useState('asc');

  const handleChangeSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSort(SORT[e.target.value]);
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  return {
    category,
    sort,
    handleChangeSort,
    handleChangeCategory,
  };
}
