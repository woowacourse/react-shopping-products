import { useEffect, useState } from 'react';

import useProductList from '@/hooks/useProductList';

import Header from '@/components/Header';
import CartCountIcon from '@/components/CartCountIcon';
import BaseDropDown from '@/components/dropdown/BaseDropDown';
import ProductList from '@/components/ProductList';
import Toast from '@/components/Toast';

import { CATEGORY_LIST, PRICE_SORT } from '@/constants/productList';

import styled from '@emotion/styled';
import theme from '@/style/theme.style';

const Products = () => {
  const {
    page,
    products,
    error,
    loadNextPage,
    hasNextPage,
    handleChangeSort,
    handleChangeCategory,
  } = useProductList();

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (error) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <S.Container>
      <Header>
        <S.HeaderContent>
          SHOP
          <CartCountIcon />
        </S.HeaderContent>
      </Header>
      <S.BodyContent>
        <S.Title>우테코 상품 목록</S.Title>
        <S.DropDownWrapper>
          <BaseDropDown
            initialValue="전체"
            options={CATEGORY_LIST}
            onChangeSelect={handleChangeCategory}
          />
          <BaseDropDown
            initialValue="낮은 가격순"
            options={PRICE_SORT}
            onChangeSelect={handleChangeSort}
          />
        </S.DropDownWrapper>
        <ProductList
          products={products}
          page={page}
          getNextPage={loadNextPage}
          hasNextPage={hasNextPage}
        />
      </S.BodyContent>
      {showToast && <Toast message={(error as Error).message} />}
    </S.Container>
  );
};

export default Products;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
  `,
  HeaderContent: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 5%;
  `,
  BodyContent: styled.div`
    width: 90%;
    height: calc(100% - 107px); // 전체 y축에 스크롤이 안 생기는 높이
    padding: 5%;
  `,
  Title: styled.h1`
    width: 100%;
    padding: 5% 0;
    font-size: ${theme.fontSize.xl};
    font-weight: ${theme.fontWeight.extraBold};
  `,
  DropDownWrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `,
};
