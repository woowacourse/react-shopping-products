import React from 'react';
import Title from '../Title/Title';
import Dropdown from '../Dropdown/Dropdown';
import ProductList from '../ProductList/ProductList';
import { DropdownContainer, Section } from './ProductSection.styles';
import { CATEGORY, SORT_PRICE } from '../../../constants/productConfig';
import { SortType, CategoryType, CartItem } from '../../../types/product';
import { ProductElement } from '../../../types/product';

interface ProductSectionProps {
  products: ProductElement[];
  cart?: CartItem[] | null;
  sort: SortType;
  category: CategoryType;
  onFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onAddCart: (product: ProductElement) => Promise<void>;
  onRemoveCart: (product: ProductElement) => Promise<void>;
}

function ProductSection({
  products,
  sort,
  category,
  onFilter,
  onSort,
  onAddCart,
  onRemoveCart,
}: ProductSectionProps) {
  return (
    <Section>
      <Title title="우테코 상품 목록" />
      <DropdownContainer>
        <Dropdown value={category} options={CATEGORY} onChange={onFilter} />
        <Dropdown value={sort} options={SORT_PRICE} onChange={onSort} />
      </DropdownContainer>
      <ProductList
        onAddCart={onAddCart}
        onRemoveCart={onRemoveCart}
        products={products}
      />
    </Section>
  );
}

export default ProductSection;
