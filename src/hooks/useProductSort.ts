import { useState } from 'react';
import { SORT } from '../constants/products';

function useProductSort() {
  const [sort, setSort] = useState('asc');
  const handleChangeSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSort(SORT[e.target.value]);
  };

  return { sort, handleChangeSort };
}

export default useProductSort;
