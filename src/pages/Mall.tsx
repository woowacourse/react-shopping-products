import { CATEGORY, CATEGORY_LIST } from "../constants/category";
import { SORT, SORT_LIST } from "../constants/sort";

import Dropdown from "../components/Dropdown";
import { Global } from "@emotion/react";
import Header from "../components/Header";
import InfiniteScrollComponent from "../components/InfiniteProductsScrollComponent";
import MainTitle from "../components/MainTitle";
import { baseStyle } from "../style/baseStyle";
import styled from "@emotion/styled";
import useProducts from "../hooks/useProducts";

const S = {
  MainMall: styled.div`
    padding: 36px 24px;

    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  Toolbar: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  ProductList: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 183px);
    gap: 16px;
  `,
};

const Mall = () => {
  const {
    products,
    isLoading,
    error,
    fetchNextPage,
    handleCategoryChange,
    handleSortChange,
  } = useProducts();

  return (
    <>
      <Global styles={baseStyle} />
      <Header />

      <S.MainMall>
        <MainTitle>러기의 쇼핑몰</MainTitle>
        <S.Toolbar>
          <Dropdown
            options={CATEGORY_LIST}
            engToKor={CATEGORY}
            handleChange={handleCategoryChange}
          />
          <Dropdown
            options={SORT_LIST}
            engToKor={SORT}
            handleChange={handleSortChange}
          />
        </S.Toolbar>
        <S.ProductList>
          <InfiniteScrollComponent
            productObject={{ products, isLoading, error, fetchNextPage }}
          />
        </S.ProductList>
      </S.MainMall>
    </>
  );
};

export default Mall;
