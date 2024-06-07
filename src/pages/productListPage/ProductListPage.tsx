import { useRef } from 'react';

import * as Styled from './ProductListPage.styled';

import Dropdown from '@/components/common/dropdown/Dropdown';
import Header from '@/components/common/header/Header';
import InfinityScrollContainer from '@/components/common/InfinityScrollContainer';
import IntersectionContainer from '@/components/common/intersectionContainer/IntersectionContainer';
import ProductCardList from '@/components/productCardList/ProductCardList';
import Title from '@/components/title/Title';
import { CATEGORY, SORT_OPTIONS } from '@/constants/dropdownOption';

import useProductDropdown from '@/hooks/useProductDropdown';
import useProductList from '@/hooks/useProductList';

const ProductListPage = () => {
  const { category, order, handleChangeCategory, handleChangeSort } = useProductDropdown();
  const { data, isLoading, fetchNextPage, hasNextPage } = useProductList({
    category: category.value,
    sortOptions: order.value,
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  return (
    <InfinityScrollContainer
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      bottomRef={bottomRef}
    >
      <Styled.PageContainer>
        <Header />
        <Styled.CommonContainer>
          <Title title="상품 목록" />
          <Styled.DropdownContainer>
            <Dropdown
              value={category.label}
              options={CATEGORY}
              handleSelect={handleChangeCategory}
            />
            <Dropdown value={order.label} options={SORT_OPTIONS} handleSelect={handleChangeSort} />
          </Styled.DropdownContainer>
          <ProductCardList data={data} isLoading={isLoading} />
          <IntersectionContainer bottomRef={bottomRef} isNextPage={hasNextPage || isLoading} />
        </Styled.CommonContainer>
      </Styled.PageContainer>
    </InfinityScrollContainer>
  );
};

export default ProductListPage;
