import { CATEGORY, CATEGORY_LIST } from "../constants/category";
import { SORT, SORT_LIST } from "../constants/sort";
import { useEffect, useState } from "react";

import CartModal from "../components/CartModal";
import Dropdown from "../components/Dropdown";
import { Global } from "@emotion/react";
import Header from "../components/Header";
import InfiniteScrollComponent from "../components/InfiniteScrollComponent";
import MainTitle from "../components/MainTitle";
import { Product } from "../types/products";
import ProductCard from "../components/product/ProductCard";
import { ToastContext } from "../components/Toasts/ToastProvider";
import { baseStyle } from "../style/baseStyle";
import styled from "@emotion/styled";
import useCustomContext from "../hooks/useCustomContext";
import useManageCartItem from "../hooks/cartItem/useManageCartItem";
import useProducts from "../hooks/products/useProducts";

const Mall = () => {
  const {
    products,
    isLoading: isProductLoading,
    error: productError,
    fetchNextPage,
    handleCategoryChange,
    handleSortChange,
  } = useProducts();

  const { cartItems, error: toggleCartItemError } = useManageCartItem();

  const { failAlert } = useCustomContext(ToastContext);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((isCartOpen) => !isCartOpen);
  };

  useEffect(() => {
    if (toggleCartItemError && toggleCartItemError instanceof Error) {
      failAlert(toggleCartItemError.message);
    }
  }, [toggleCartItemError, failAlert]);

  useEffect(() => {
    if (productError && productError instanceof Error) {
      failAlert(productError.message);
    }
  }, [productError, failAlert]);

  return (
    <>
      <Global styles={baseStyle} />
      <Header itemCount={cartItems?.length} toggleCart={toggleCart} />
      <CartModal
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        toggleCart={toggleCart}
      />
      <S.MainMall>
        <MainTitle>피터의 쇼핑몰</MainTitle>
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
            isLoading={isProductLoading}
            error={productError}
            fetchNextPage={fetchNextPage}
          >
            {products?.map((page) =>
              page?.content?.map((product: Product, index: number) => (
                <ProductCard key={`${index}-${product.id}`} product={product} />
              ))
            )}
          </InfiniteScrollComponent>
        </S.ProductList>
      </S.MainMall>
    </>
  );
};

export default Mall;

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
