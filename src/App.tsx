import { useEffect } from "react";
import { useErrorContext } from "./contexts/ErrorContext";
import Dropdown from "./components/Dropdown/Dropdown";
import Spinner from "./components/Spinner/Spinner";
import ProductList from "./components/Product/ProductList/ProductList";
import { CATEGORY_OPTIONS, ORDER_BY_OPTIONS } from "./constants/categoryOption";
import * as styles from "./App.style";
import { CategoryOptionType, OrderByOptionType } from "./types/categoryOption";
import Header from "./components/Header/Header";
import MswStatus from "./components/MswStatus";

import { useData } from "./hooks/useData";
import { useProductQuery } from "./hooks/useProductQuery";
import { URLS } from "./constants/url";
import { commonOpts } from "./constants/requestHeader";
import { useQueryContext } from "./contexts/QueryContext";

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
  } = useData("products", productQuery, {}, false);
  const { error: cartFetchError, refetch: fetchCart } = useData(
    "cart-items",
    URLS.CART_ITEMS,
    commonOpts,
    false
  );
  const productsData = dataPool?.products;

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    fetchProducts();
  }, [productsQuery, fetchProducts]);

  useEffect(() => {
    if (productFetchError) {
      showError(productFetchError);
    }
    if (cartFetchError) {
      showError(cartFetchError);
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
      <MswStatus />
    </div>
  );
}

export default App;
