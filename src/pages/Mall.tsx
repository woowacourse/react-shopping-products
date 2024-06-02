import { useEffect } from "react";
import { Global } from "@emotion/react";
import styled from "@emotion/styled";

import { baseStyle } from "../style/baseStyle";

import useProducts from "../hooks/useProducts";
import useCustomContext from "../hooks/useCustomContext";

import { ToggleCartItemContext } from "../components/ToggleCartItemProvider";
import { ToastContext } from "../components/Toasts/ToastProvider";

import Dropdown from "../components/Dropdown";
import Header from "../components/Header";
import InfiniteScrollComponent from "../components/InfiniteProductsScrollComponent";
import MainTitle from "../components/MainTitle";
import ProductCard from "../components/product/ProductCard";

import { PRODUCT_CATEGORY, PRODUCT_SORT } from "../constants/mall";
import { ERROR_MESSAGE } from "../constants/message";

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
    isLoading: isProductLoading,
    error: productError,
    fetchNextPage,
    handleCategoryChange,
    handleSortChange,
  } = useProducts();

  const { cartItems, error: toggleCartItemError } = useCustomContext(ToggleCartItemContext);

  const { failAlert } = useCustomContext(ToastContext);

  useEffect(() => {
    if (toggleCartItemError && toggleCartItemError instanceof Error) {
      failAlert(toggleCartItemError.message);
    }
  }, [toggleCartItemError]);

  useEffect(() => {
    if (productError && productError instanceof Error) {
      failAlert(productError.message);
    }
  }, [productError]);

  return (
    <>
      <Global styles={baseStyle} />
      <Header itemCount={cartItems.length} />
      <S.MainMall>
        <MainTitle>러기의 쇼핑몰</MainTitle>
        <S.Toolbar>
          <Dropdown options={PRODUCT_CATEGORY} handleChange={handleCategoryChange} />
          <Dropdown options={PRODUCT_SORT} handleChange={handleSortChange} />
        </S.Toolbar>
        <S.ProductList>
          <InfiniteScrollComponent isLoading={isProductLoading} handleScroll={fetchNextPage}>
            {products.map((product, index) => (
              <ProductCard key={`${index}${product.id}`} product={product} />
            ))}
            {productError! && <div>{ERROR_MESSAGE.getProducts}</div>}
          </InfiniteScrollComponent>
        </S.ProductList>
      </S.MainMall>
    </>
  );
};

export default Mall;
