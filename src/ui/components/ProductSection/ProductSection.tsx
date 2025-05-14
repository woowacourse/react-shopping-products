import Title from '../Title/Title';
import Dropdown from '../Dropdown/Dropdown';
import ProductList from '../ProductList/ProductList';
import { DropdownContainer, Section } from './ProductSection.styles';
import { CATEGORY, SORT_PRICE } from '../../../constants/productConfig';
import React, { useState } from 'react';
import { SortType, CategoryType } from '../../../types/product';

function ProductSection(cart) {
  const [sort, setSort] = useState<SortType>('낮은 가격 순');
  const [category, setCategory] = useState<CategoryType>('전체');

  const handleSortPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value === '낮은 가격 순' || value === '높은 가격 순') {
      setSort(value);
    }
  };

  const handleFilterCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value === '전체' || value === '식료품' || value === '패션잡화')
      setCategory(value);
  };

  return (
    <Section>
      <Title title="bpple 상품 목록" />
      <DropdownContainer>
        <Dropdown
          value={category}
          options={CATEGORY}
          onChange={handleFilterCategory}
        />
        <Dropdown
          value={sort}
          options={SORT_PRICE}
          onChange={handleSortPrice}
        />
      </DropdownContainer>
      <ProductList sort={sort} category={category} cart={cart} />
    </Section>
  );
}

export default ProductSection;
