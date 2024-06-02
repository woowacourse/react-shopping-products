import { useState } from 'react';

import DropdownContainer from '../DropdownContainer/DropdownContainer';
import { Category, Sort } from '../../types/type';
import ProductItemList from '../ProductItemList/ProductItemList';

import * as S from './ProductItemSection.style';

interface ProductItemSectionProps {
  onError: (error: string) => void;
}

function ProductItemSection({ onError }: ProductItemSectionProps) {
  const [category, setCategory] = useState<Category>('all' as Category);
  const [sort, setSort] = useState<Sort>('price,asc' as Sort);
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value as Category);
  const handleSortingChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSort(e.target.value as Sort);

  return (
    <S.ProductSectionContainer>
      <DropdownContainer
        category={category}
        onChangeCategory={handleCategoryChange}
        sort={sort}
        onChangeSort={handleSortingChange}
      />
      <ProductItemList category={category} sort={sort} onError={onError} />
    </S.ProductSectionContainer>
  );
}

export default ProductItemSection;
