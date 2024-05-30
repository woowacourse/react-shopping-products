import { FlexColumn, FlexSpaceBetween, WhiteSpace } from '@/style/common.style';
import { useEffect, useState } from 'react';

import CartCountIcon from '@/components/CartCountIcon';
import FilterCategory from '@/components/dropdown/FilterCategory';
import Header from '@/components/Header';
import ProductList from '@/components/ProductList';
import SortOrder from '@/components/dropdown/SortOrder';
import Toast from '@/components/Toast';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';
import useProductList from '@/hooks/useProductList';

const Products = () => {
  const {
    page,
    products,
    error,
    fetchNextPage,
    hasNextPage,
    handleChangeOrder,
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
            <FilterCategory onChangeCategory={handleChangeCategory} />
            <SortOrder onChangeOrder={handleChangeOrder} />
          </S.DropDownWrapper>
          <ProductList
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
