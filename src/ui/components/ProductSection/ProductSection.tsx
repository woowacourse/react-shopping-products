import Title from '../Title/Title';
import Dropdown from '../Dropdown/Dropdown';
import ProductList from '../ProductList/ProductList';
import { DropdownContainer, Section } from './ProductSection.styles';
import { CATEGORY, SORT_PRICE } from '../../../constants/productConfig';
import { SortType, CategoryType } from '../../../types/product';
import React from 'react';
import { ProductElement } from '../../../App';

interface ProductSectionProps {
  data: any;
  sort: SortType;
  category: CategoryType;
  onFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onAddCart: (product: ProductElement) => Promise<void>;
  onRemoveCart: (product: ProductElement) => Promise<void>;
}

function ProductSection({
  data,
  sort,
  category,
  onFilter,
  onSort,
  onAddCart,
  onRemoveCart,
}: ProductSectionProps) {
  return (
    <Section>
      <Title title="bpple 상품 목록" />
      <DropdownContainer>
        <Dropdown value={category} options={CATEGORY} onChange={onFilter} />
        <Dropdown value={sort} options={SORT_PRICE} onChange={onSort} />
      </DropdownContainer>
      <ProductList
        onAddCart={onAddCart}
        onRemoveCart={onRemoveCart}
        data={data}
      />
    </Section>
  );
}

export default ProductSection;
