import { Global } from "@emotion/react";

import { baseStyle } from "../../style/baseStyle";

import useProducts from "../../hooks/useProducts";
import useCustomContext from "../../hooks/useCustomContext";
import useErrorAlert from "../../hooks/useErrorAlert";

import { ToggleCartItemContext } from "../../components/provider/ToggleCartItemProvider";
import Dropdown from "../../components/common/Dropdown";
import Header from "../../components/layout/Header";
import InfiniteScroll from "../../components/utils/InfiniteScroll";
import MainTitle from "../../components/common/MainTitle";
import ProductCard from "../../components/product/ProductCard";

import { PRODUCT_CATEGORY, PRODUCT_SORT } from "../../constants/mall";
import { ERROR_MESSAGE } from "../../constants/message";

import S from "./styledComponent";

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
  useErrorAlert({ toggleCartItemError, productError });

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
          <InfiniteScroll isLoading={isProductLoading} handleScroll={fetchNextPage}>
            {products.map((product, index) => (
              <ProductCard key={`${index}${product.id}`} product={product} />
            ))}
            {productError! && <div>{ERROR_MESSAGE.getProducts}</div>}
          </InfiniteScroll>
        </S.ProductList>
      </S.MainMall>
    </>
  );
};

export default Mall;
