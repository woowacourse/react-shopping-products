import * as S from './ProductControl.styled';
import Select from '../common/Select/Select';
import getProductList from '../../api/productListApi';
import { CategoryOptions, SortOptions } from '../../constants/selectOptions';
import { Dispatch, SetStateAction, useState } from 'react';
import { ResponseProduct } from '../../api/types';

function ProductControl({
  setProductList,
  setErrorMessage,
}: {
  setProductList: Dispatch<SetStateAction<ResponseProduct[]>>;
  setErrorMessage: (message: string) => void;
}) {
  const [category, setCategory] = useState<string>('');
  const [sort, setSort] = useState<string>('');

  async function handleCategoryChange(category: string) {
    try {
      setCategory(category);
      const rawProductList = await getProductList({ category, sort });
      setProductList(rawProductList);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  }

  async function handleSortChange(sort: string) {
    try {
      setSort(sort);
      const rawProductList = await getProductList({ category, sort });
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
        <Select options={CategoryOptions} onChange={handleCategoryChange} />
        <Select options={SortOptions} onChange={handleSortChange} />
      </S.SelectContainer>
    </S.ProductControlContainer>
  );
}

export default ProductControl;
