import React, { useState } from 'react';
import Title from '../Title/Title';
import Dropdown from '../Dropdown/Dropdown';
import ProductList from '../ProductList/ProductList';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import {
  DropdownContainer,
  Section,
  EmptyMessage,
  LoadingContainer,
} from './ProductSection.styles';
import { CATEGORY, SORT_PRICE } from '../../../constants/productConfig';
import { SortType, CategoryType, SortKeyType } from '../../../types/product';
import { useProductsWithCart } from '../../../hooks/useProductsWithCart';

function ProductSection() {
  const [sort, setSort] = useState<SortType>('낮은 가격 순');
  const [category, setCategory] = useState<CategoryType>('전체');

  const sortTypeToKey: Record<SortType, SortKeyType> = {
    '낮은 가격 순': 'asc',
    '높은 가격 순': 'desc',
  };
  const mappedSortType = sortTypeToKey[sort];

  const {
    transformedProducts: products,
    isLoading,
    isError,
  } = useProductsWithCart(mappedSortType, category);

  const handleFilterCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === '전체' || value === '식료품' || value === '패션잡화') setCategory(value);
  };

  const handleSortPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === '낮은 가격 순' || value === '높은 가격 순') {
      setSort(value);
    }
  };

  return (
    <Section>
      <Title title="우테코 상품 목록" />
      <DropdownContainer>
        <Dropdown value={category} options={CATEGORY} onChange={handleFilterCategory} />
        <Dropdown value={sort} options={SORT_PRICE} onChange={handleSortPrice} />
      </DropdownContainer>
      {isLoading ? (
        <LoadingContainer>
          <LoadingSpinner duration={2} />
        </LoadingContainer>
      ) : !isError && products.length === 0 ? (
        <EmptyMessage>상품이 존재하지 않습니다.</EmptyMessage>
      ) : (
        <ProductList products={products} />
      )}
    </Section>
  );
}

export default ProductSection;
