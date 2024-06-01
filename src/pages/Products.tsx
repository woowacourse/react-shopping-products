import { CATEGORY_LIST, SORT_ORDER } from '@/constants/productList';
import { FlexColumn, FlexSpaceBetween, WhiteSpace } from '@/style/common.style';
import { useEffect, useState } from 'react';

import BaseDropDown from '@/components/dropdown/BaseDropDown';
import CartCountIcon from '@/components/CartCountIcon';
import Header from '@/components/Header';
import ProductList from '@/components/ProductList';
import Toast from '@/components/Toast';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';
import useProductList from '@/hooks/useProductList';

const Products = () => {
  const {
    page,
    products,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    handleChangeOrder,
    handleChangeCategory,
  } = useProductList();

  const [showToast, setShowToast] = useState(false);

  const categoryOptions = CATEGORY_LIST;
  const sortOptions = SORT_ORDER;

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
    <>
      <S.Container>
        <Header>
          <S.HeaderContent>
            SHOP
            <CartCountIcon />
          </S.HeaderContent>
        </Header>
        <S.Body>
          <S.Title>우테코 상품 목록</S.Title>
          <S.DropDownWrapper>
            <BaseDropDown
              initialValue="전체"
              options={categoryOptions}
              onChangeSelect={handleChangeCategory}
            />
            <BaseDropDown
              initialValue="낮은 가격순"
              options={sortOptions}
              onChangeSelect={handleChangeOrder}
            />
          </S.DropDownWrapper>
          <ProductList
            isLoading={isLoading}
            products={products}
            page={page}
            getNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        </S.Body>
        {showToast && <Toast message={(error as Error).message} />}
      </S.Container>
    </>
  );
};

export default Products;

const S = {
  Container: styled.div`
    ${FlexColumn}
    width: 100%;
    height: 100%;
    position: relative;
  `,
  HeaderContent: styled.div`
    ${FlexSpaceBetween}
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 5%;
  `,
  Body: styled.div`
    ${WhiteSpace}
    height: 100%;
  `,
  Title: styled.h1`
    width: 100%;
    margin-top: 36px;
    font-size: ${theme.fontSize.xlarge};
    font-weight: ${theme.fontWeight.extraBold};
  `,
  DropDownWrapper: styled.div`
    margin-top: 16px;
    ${FlexSpaceBetween}
  `,
};
