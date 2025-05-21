import { useEffect, useState } from "react";
import { useErrorContext } from "./contexts/ErrorContext";
import Dropdown from "./components/Dropdown/Dropdown";
import Spinner from "./components/Spinner/Spinner";
import ProductList from "./components/Product/ProductList/ProductList";
import { CATEGORY_OPTIONS, ORDER_BY_OPTIONS } from "./constants/categoryOption";
import * as styles from "./App.style";
import { CategoryOptionType, OrderByOptionType } from "./types/categoryOption";
import Header from "./components/Header/Header";
import MswStatus from "./components/MswStatus";
import MswDebug from "./components/MswDebug";
import { useGetQuery } from "./hooks/useGetQuery";
import { useProductQuery } from "./hooks/useProductQuery";
import { URLS } from "./constants/url";
import { commonOpts } from "./constants/requestHeader";
import { useQueryContext } from "./contexts/QueryContext";

function App() {
  const { showError } = useErrorContext();
  const { dataPool, productsQuery, setProductsQuery } = useQueryContext();

  const productQuery = useProductQuery(productsQuery);

  const {
    loading: productFetchLoading,
    error: productFetchError,
    refetch: fetchProducts,
  } = useGetQuery("products", productQuery, {}, false);
  const { error: cartFetchError, refetch: fetchCart } = useGetQuery(
    "cart-items",
    URLS.CART_ITEMS,
    commonOpts,
    false
  );

  const productsData = dataPool["products"]?.content;

  const [category, setCategory] = useState<CategoryOptionType>("전체");
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    // DEV 환경에서만 디버그 표시
    if (import.meta.env.DEV) {
      setShowDebug(true);
    }
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
    setCategory(value);
  };
  const handleOrderBySelect = (value: OrderByOptionType) => {
    setProductsQuery(value);
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
          value={productsQuery}
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
              ? productsData
              : productsData?.filter((item) => item.category == category)
          }
        />
      )}
      <MswStatus />
      {showDebug && <MswDebug />}
    </div>
  );
}

export default App;
