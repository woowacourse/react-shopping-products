import { useRef } from 'react';

import * as Styled from './ProductListPage.styled';

import Dropdown from '@/components/common/dropdown/Dropdown';
import Header from '@/components/common/header/Header';
import InfinityScrollContainer from '@/components/common/InfinityScrollContainer';
import IntersectionContainer from '@/components/common/intersectionContainer/IntersectionContainer';
import ProductCardList from '@/components/productCardList/ProductCardList';
import Title from '@/components/title/Title';
import { CATEGORY, SORT_OPTIONS } from '@/constants/dropdownOption';

import useProduct from '@/hooks/useProduct';

const ProductListPage = () => {
  const {
    category,
    order,
    handleChangeCategory,
    handleChangeSort,
    data,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useProduct();

  const bottomRef = useRef<HTMLDivElement>(null);

  return (
    <InfinityScrollContainer
      isFetching={isFetching}
      fetchNextPage={fetchNextPage}
      bottomRef={bottomRef}
    >
      <Styled.PageContainer>
        <Header />
        <Styled.CommonContainer>
          <Title title="상품 목록" />
          <Styled.DropdownContainer>
            <Dropdown label={category} options={CATEGORY} handleSelect={handleChangeCategory} />
            <Dropdown label={order} options={SORT_OPTIONS} handleSelect={handleChangeSort} />
          </Styled.DropdownContainer>
          <ProductCardList data={data} isPending={isPending} isFetching={isFetching} />
          <IntersectionContainer bottomRef={bottomRef} hasNextPage={hasNextPage} />
        </Styled.CommonContainer>
      </Styled.PageContainer>
    </InfinityScrollContainer>
  );
};

export default ProductListPage;
