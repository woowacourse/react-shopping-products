import { useState } from 'react';
import { CATEGORY } from '../constants/products';

function useProductCategory() {
  const [category, setCategory] = useState(CATEGORY[0]);
  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  return { category, handleChangeCategory };
}

export default useProductCategory;
