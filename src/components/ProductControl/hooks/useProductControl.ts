import { useState } from 'react';
import { CategoryOptionType, SelectType, SortOptionType } from '../types';
import { productApi } from '../../../api/productApi';
import { ResponseProduct } from '../../../api/types';
import { useCartItemList } from '../../../pages/productListPage/context/useCartContext';

export const useProductControl = (setProductList: React.Dispatch<React.SetStateAction<ResponseProduct[]>>) => {
  const [category, setCategory] = useState<CategoryOptionType>('');
  const [sort, setSort] = useState<SortOptionType>('price,asc');
  const { setErrorMessage } = useCartItemList();

  async function handleSelectChange(selectedValue: CategoryOptionType | SortOptionType, type: SelectType) {
    try {
      const newCategory = type === 'category' ? selectedValue : category;
      const newSort = type === 'sort' ? selectedValue : sort;

      if (type === 'category') {
        setCategory(selectedValue as CategoryOptionType);
      } else {
        setSort(selectedValue as SortOptionType);
      }

      const rawProductList = await productApi.get({
        category: newCategory,
        sort: newSort,
      });
      setProductList(rawProductList);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  }

  return { handleSelectChange };
};
