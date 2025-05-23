import { useEffect } from "react";

import Dropdown from "./components/Dropdown/Dropdown";
import Header from "./components/Header/Header";
import MswStatus from "./components/Msw/MswStatus";
import ProductList from "./components/Product/ProductList/ProductList";
import Spinner from "./components/Spinner/Spinner";

import { useErrorContext } from "./contexts/ErrorContext";
import { useQueryContext } from "./contexts/QueryContext";

import { useData } from "./hooks/useData";
import { useProductQuery } from "./hooks/useProductQuery";

import * as styles from "./App.style";

import { CATEGORY_OPTIONS, ORDER_BY_OPTIONS } from "./constants/categoryOption";

import type {
  CategoryOptionType,
  OrderByOptionType,
} from "./types/categoryOption";

import {
  cartQueryOptions,
  productQueryOptions,
} from "./constants/requestOptions";

function App() {
  const { showError } = useErrorContext();
  const {
    dataPool,
    productsQuery,
    setProductsQuery,
    categoryQuery,
    setCategoryQuery,
  } = useQueryContext();

  const productQuery = useProductQuery(productsQuery, categoryQuery);

  const {
    loading: productFetchLoading,
    error: productFetchError,
    refetch: fetchProducts,
  } = useData("products", { url: productQuery, ...productQueryOptions });

  const { error: cartFetchError, refetch: fetchCart } = useData(
    "cart-items",
    cartQueryOptions
  );
  const productsData = dataPool?.products;

  useEffect(() => {
    if (!dataPool?.products) fetchCart();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [productQuery]);

  useEffect(() => {
    const fetchError = productFetchError || cartFetchError;
    if (fetchError) {
      showError(fetchError);
    }
  }, [productFetchError, cartFetchError, showError]);

  const handleSelectCategory = (value: CategoryOptionType) => {
    setCategoryQuery(value);
  };
  const handleOrderBySelect = (value: OrderByOptionType) => {
    setProductsQuery(value);
  };

  return (
    <div css={styles.appCss}>
      <div style={{ width: 380 }}>
        <h2 css={styles.titleCss}>마빈 잡화점</h2>
        <div css={styles.dropdownDivCss}>
          <Header />
          <Dropdown
            list={CATEGORY_OPTIONS}
            placeholder="전체"
            value={categoryQuery}
            onSelect={handleSelectCategory}
          />

          <Dropdown
            list={ORDER_BY_OPTIONS}
            placeholder="낮은 가격순"
            value={productsQuery}
            onSelect={handleOrderBySelect}
          />
        </div>
        {productFetchLoading ? (
          <div style={{ marginBottom: "500px" }}>
            <Spinner size="medium" />
          </div>
        ) : (
          <ProductList products={productsData} />
        )}
        {process.env.NODE_ENV === "development" &&
          import.meta.env.VITE_APP_USE_MSW && <MswStatus />}
      </div>
    </div>
  );
}

export default App;
