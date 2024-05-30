import { useRef } from 'react';

import * as Styled from './ProductListPage.styled';

import InfinityScrollContainer from '@/components/common/InfinityScrollContainer';
import Dropdown from '@/components/dropdown/Dropdown';
import Header from '@/components/header/Header';
import ProductCardList from '@/components/productCardList/ProductCardList';
import Title from '@/components/title/Title';
import Toast from '@/components/toast/Toast';
import { CATEGORY, SORT_OPTIONS } from '@/constants/dropdownOption';

import useCartItems from '@/hooks/useCartItems';
import useProductList from '@/hooks/useProductList';

const ProductListPage = () => {
  const {
    productList,
    isLoading,
    fetchNextPage,
    errorState,
    handleChangeCategory,
    handleChangeSort,
    order,
    category,
  } = useProductList();
  const { cartItems, handleAddCartItem, handleDeleteCartItem, matchCartItem } = useCartItems();
  const bottomRef = useRef<HTMLDivElement>(null);

  return (
    <InfinityScrollContainer
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      isError={errorState.isError}
      bottomRef={bottomRef}
    >
      <Styled.PageContainer>
        <Header cartCount={cartItems.length} />
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

          <ProductCardList
            productList={productList}
            handleAddCartItem={handleAddCartItem}
            handleDeleteCartItem={handleDeleteCartItem}
            matchCartItem={matchCartItem}
            isLoading={isLoading}
          />

          <div ref={bottomRef} style={{ height: 100 }}></div>
        </Styled.CommonContainer>
      </Styled.PageContainer>
      <Toast isError={errorState.isError} errorMessage={errorState.errorMessage} />
    </InfinityScrollContainer>
  );
};

export default ProductListPage;
