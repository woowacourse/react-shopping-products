import useProductFilters from '@/hooks/product/useProductFilters';

import Header from '@/components/Header';
import CartCountIcon from '@/components/cartItem/CartCountIcon';
import BaseDropDown from '@/components/dropdown/BaseDropDown';
import ProductList from '@/components/product/ProductList';

import { CATEGORY_LIST, PRICE_SORT } from '@/constants/productList';

import { STYLE_THEME } from '@/styles/constants/theme';
import styled from '@emotion/styled';

const Products = () => {
  const { sort, category, handleSortChange, handleCategoryChange } =
    useProductFilters();

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
            onChangeSelect={handleCategoryChange}
          />
          <BaseDropDown
            initialValue="낮은 가격순"
            options={PRICE_SORT}
            onChangeSelect={handleSortChange}
          />
        </S.DropDownWrapper>
        <ProductList sort={sort} category={category} />
      </S.BodyContent>
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
    font-size: ${STYLE_THEME.fontSize.xl};
    font-weight: ${STYLE_THEME.fontWeight.extraBold};
  `,
  DropDownWrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `,
};
