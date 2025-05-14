import Title from '../Title/Title';
import Dropdown from '../Dropdown/Dropdown';
import ProductList from '../ProductList/ProductList';
import { DropdownContainer, Section } from './ProductSection.styles';
import { CATEGORY, SORT_PRICE } from '../../../constants/productConfig';
import React, { useState } from 'react';
import { SortType } from '../../../types/product';

function ProductSection() {
  const [sort, setSort] = useState<SortType>('낮은 가격 순');

  const handleSortPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value === '낮은 가격 순' || value === '높은 가격 순') {
      setSort(value);
    }
  };

  return (
    <Section>
      <Title title="bpple 상품 목록" />
      <DropdownContainer>
        <Dropdown value="전체" options={CATEGORY} onChange={() => {}} />
        <Dropdown
          value={sort}
          options={SORT_PRICE}
          onChange={handleSortPrice}
        />
      </DropdownContainer>
      <ProductList sort={sort} />
    </Section>
  );
}

export default ProductSection;
