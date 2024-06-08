import { CATEGORY_LIST, SORT_ORDER } from '@/constants/productList';
import { FlexColumn, FlexSpaceBetween, WhiteSpace } from '@/style/common.style';
import { startTransition, useEffect, useState } from 'react';

import BaseDropDown from '@/components/dropdown/BaseDropDown';
import CartCountIcon from '@/components/CartCountIcon';
import CartModal from '@/components/cart/CartModal';
import Error404 from '@/components/Error404';
import Header from '@/components/Header';
import ProductList from '@/components/ProductList';
import { SkeletonList } from '@/components/SkeletonList';
import Toast from '@/components/Toast';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';
import useErrorContext from '@/hooks/useErrorContext';
import useProductListQuery from '@/hooks/useProductListQuery';

const Products = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    products,
    page,
    isSuccess,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    handleChangeOrder,
    handleChangeCategory,
  } = useProductListQuery();

  const { setError } = useErrorContext();

  useEffect(() => {
    if (error) {
      setError(error as Error);
    }
  }, [error, setError]);

  const categoryOptions = CATEGORY_LIST;
  const sortOptions = SORT_ORDER;

  const handleCategoryChange = (category: string) => {
    startTransition(() => {
      handleChangeCategory(category);
    });
  };

  const handleOrderChange = (order: string) => {
    startTransition(() => {
      handleChangeOrder(order);
    });
  };

  return (
    <>
      <S.Container>
        <Header>
          <S.HeaderContent>
            SHOP
            <CartCountIcon onClick={() => setIsOpen((prev) => !prev)} />
          </S.HeaderContent>
        </Header>
        <S.Body>
          <S.Title>우테코 상품 목록</S.Title>
          <S.DropDownWrapper>
            <BaseDropDown
              initialValue="전체"
              options={categoryOptions}
              onChangeSelect={handleCategoryChange}
            />
            <BaseDropDown
              initialValue="낮은 가격순"
              options={sortOptions}
              onChangeSelect={handleOrderChange}
            />
          </S.DropDownWrapper>
          {isFetching && <SkeletonList length={8} />}
          {isSuccess && (
            <ProductList
              page={page}
              isLoading={isFetching}
              products={products}
              getNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
            />
          )}
          {error && <Error404 />}
        </S.Body>
        <Toast />
      </S.Container>
      {isOpen && <CartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
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
  SkeletonWrapper: styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    gap: 16px;
  `,
};
