import useFetch from "./hooks/useFetch";
import { CartItemResponse, ProductResponse } from "./types/response";
import { useEffect, useState } from "react";
import { useErrorContext } from "./contexts/ErrorContext";
import { useProductQuery } from "./hooks/useProductQuery";
import { URLS } from "./constants/url";
import Dropdown from "./components/Dropdown/Dropdown";
import Header from "./components/Header/Header";
import Spinner from "./components/Spinner/Spinner";
import ProductList from "./components/Product/ProductList/ProductList";
import { CATEGORY_OPTIONS, ORDER_BY_OPTIONS } from "./constants/categoryOption";
import * as styles from "./App.style";
import { CategoryOptionType, OrderByOptionType } from "./types/categoryOption";
import { useCartContext } from "./contexts/CartContext";

function App() {
  const { showError } = useErrorContext();
  const { setCartLength } = useCartContext();
  const [category, setCategory] = useState<CategoryOptionType>("전체");
  const [orderBy, setOrderBy] = useState<OrderByOptionType>("낮은 가격순");

  const {
    data: products,
    isLoading: productFetchLoading,
    error: productFetchError,
    fetcher: refetchProducts,
  } = useFetch<ProductResponse>(useProductQuery(orderBy));

  const {
    data: cartItems,
    fetcher: refetchCart,
    error: cartFetchError,
  } = useFetch<CartItemResponse>(URLS.CART_ITEMS, {
    headers: {
      Authorization: `Basic ${btoa(
        `${import.meta.env.VITE_USER_ID}:${import.meta.env.VITE_PASSWORD}`
      )}`,
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    refetchProducts();
  }, [orderBy]);

  useEffect(() => {
    setCartLength(cartItems?.content?.length ?? 0);
  }, [cartItems]);

  useEffect(() => {
    if (productFetchError) {
      showError(productFetchError);
    }
    if (cartFetchError) {
      showError(cartFetchError);
    }
  }, [productFetchError, cartFetchError, showError]);

  async function handleRefetchCart() {
    await refetchCart();
  }

  const handleSelectCategory = (value: CategoryOptionType) => {
    setCategory(value);
  };
  const handleOrderBySelect = (value: OrderByOptionType) => {
    setOrderBy(value);
  };

  return (
    <div css={styles.bodyCss}>
      <div style={{ marginBottom: "80px" }}></div>
      <div css={styles.dropdownDivCss}>
        <Header />
        <Dropdown
          list={CATEGORY_OPTIONS}
          placeholder="전체"
          value={category}
          onSelect={handleSelectCategory}
        />

        <Dropdown
          list={ORDER_BY_OPTIONS}
          placeholder="낮은 가격순"
          value={orderBy}
          onSelect={handleOrderBySelect}
        />
      </div>
      {productFetchLoading ? (
        <div style={{ marginBottom: "500px" }}>
          <Spinner size="medium" />
        </div>
      ) : (
        <ProductList
          products={
            category === "전체"
              ? products?.content
              : products?.content.filter((item) => item.category == category)
          }
          cartItems={cartItems?.content}
          refetchCart={handleRefetchCart}
        />
      )}
    </div>
  );
}

export default App;
