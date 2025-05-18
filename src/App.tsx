import { useEffect, useState } from "react";
import { useErrorContext } from "./contexts/ErrorContext";
import Dropdown from "./components/Dropdown/Dropdown";
import Spinner from "./components/Spinner/Spinner";
import ProductList from "./components/Product/ProductList/ProductList";
import { CATEGORY_OPTIONS, ORDER_BY_OPTIONS } from "./constants/categoryOption";
import * as styles from "./App.style";
import { CategoryOptionType, OrderByOptionType } from "./types/categoryOption";
import { useCartContext } from "./contexts/CartContext";
import Header from "./components/Header/Header";
import { useProductContext } from "./contexts/ProductContext";

function App() {
  const { showError } = useErrorContext();

  const {
    productsData,
    productFetchLoading,
    productFetchError,
    fetchProducts,
    setOrderBy,
    orderBy,
  } = useProductContext();
  const { cartData, cartFetchError, fetchCart } = useCartContext();
  const [category, setCategory] = useState<CategoryOptionType>("전체");

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    fetchProducts();
  }, [orderBy, fetchProducts]);

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
              ? productsData
              : productsData?.filter((item) => item.category == category)
          }
          cartItems={cartData}
        />
      )}
    </div>
  );
}

export default App;
