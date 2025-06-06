import { useState } from 'react';
import { CATEGORY, SORT } from '../constants/products';
import { CategoryType, SortType } from '../types/product';

type ProductShowSettings = {
  category: CategoryType;
  sort: SortType;
};

type UseProductShowControlReturn = {
  showSettings: ProductShowSettings;
  handleChangeCategory: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeSort: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function useProductShowControl(): UseProductShowControlReturn {
  const [showSettings, setShowSettings] = useState<ProductShowSettings>({
    category: CATEGORY[0],
    sort: Object.entries(SORT)[0][1],
  });

  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validCategory = CATEGORY.find((category) => category === e.target.value);

    if (validCategory) {
      setShowSettings((prev) => ({
        ...prev,
        category: validCategory,
      }));
    }
  };

  const handleChangeSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validSort = Object.entries(SORT).find(([key]) => key === e.target.value);
    if (validSort) {
      const [, sortValue] = validSort;
      setShowSettings((prev) => ({
        ...prev,
        sort: sortValue,
      }));
    }
  };

  return {
    showSettings,
    handleChangeCategory,
    handleChangeSort,
  };
}

export default useProductShowControl;
