import * as S from './ProductControl.styled';
import Select from '../common/Select/Select';
import getProductList from '../../api/productListApi';
import { CategoryOptions, SortOptions } from '../../constants/selectOptions';
import { useState } from 'react';
import { CategoryOptionType, ProductControlProps, SelectType, SortOptionType } from './types';

function ProductControl({ setProductList, setErrorMessage }: ProductControlProps) {
  const [category, setCategory] = useState<CategoryOptionType>('');
  const [sort, setSort] = useState<SortOptionType>('price,asc');

  async function handleSelectChange(selectedValue: CategoryOptionType | SortOptionType, type: SelectType) {
    try {
      const newCategory = type === 'category' ? selectedValue : category;
      const newSort = type === 'sort' ? selectedValue : sort;

      if (type === 'category') {
        setCategory(selectedValue as CategoryOptionType);
      } else {
        setSort(selectedValue as SortOptionType);
      }

      const rawProductList = await getProductList({
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

  return (
    <S.ProductControlContainer>
      <S.ProductControlTitle>bpple 상품목록</S.ProductControlTitle>
      <S.SelectContainer>
        <Select options={CategoryOptions} onChange={(value) => handleSelectChange(value as CategoryOptionType, 'category')} />
        <Select options={SortOptions} onChange={(value) => handleSelectChange(value as SortOptionType, 'sort')} />
      </S.SelectContainer>
    </S.ProductControlContainer>
  );
}

export default ProductControl;
