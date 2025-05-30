import * as styles from './ProductList.style';
import Dropdown from '../../Dropdown/Dropdown';
import { CATEGORY_OPTIONS, ORDER_BY_OPTIONS } from '../../../constants/categoryOption';
import { useState } from 'react';
import { CategoryOptionType, OrderByOptionType } from '../../../types/categoryOption';
import FilteredProductList from '../FilteredProductList/FilteredProductList';

export default function ProductList() {
  const [category, setCategory] = useState<CategoryOptionType>('전체');
  const [orderBy, setOrderBy] = useState<OrderByOptionType>('낮은 가격순');

  return (
    <>
      <div css={styles.dropdownDivCss}>
        <Dropdown list={CATEGORY_OPTIONS} placeholder="전체" value={category} onSelect={setCategory} />
        <Dropdown list={ORDER_BY_OPTIONS} placeholder="낮은 가격순" value={orderBy} onSelect={setOrderBy} />
      </div>
      <FilteredProductList category={category} orderBy={orderBy} />
    </>
  );
}
