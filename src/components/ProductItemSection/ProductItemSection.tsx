import { useState } from 'react';

import DropdownContainer from '../DropdownContainer/DropdownContainer';
import { Category, Sort } from '../../types/type';
import ProductItemList from '../ProductItemList/ProductItemList';

import * as S from './ProductItemSection.style';

function ProductItemSection() {
  const [category, setCategory] = useState<Category>('all' as Category);
  const [sort, setSort] = useState<Sort>('price,asc' as Sort);
  const handleCategoryChange = (value: Category) => setCategory(value);
  const handleSortingChange = (value: Sort) => setSort(value);

  return (
    <S.ProductSectionContainer>
      <DropdownContainer
        onChangeCategory={handleCategoryChange}
        onChangeSort={handleSortingChange}
      />
      <ProductItemList category={category} sort={sort} />
    </S.ProductSectionContainer>
  );
}

export default ProductItemSection;
