import useFetch from "./hooks/useFetch";
import Header from "./components/Header/Header";
import { CartItemResponse, ProductResponse } from "./types/response";
import Spinner from "./components/Spinner/Spinner";
import ProductList from "./components/Product/ProductList/ProductList";
import { CATEGORY_OPTIONS, ORDER_BY_OPTIONS } from "./constants/categoryOption";
import { useEffect, useState } from "react";
import { useErrorContext } from "./contexts/ErrorContext";
import Dropdown from "./components/Dropdown/Dropdown";
import { bodyCss, dropdownDivCss } from "./App.style";

function App() {
  const { showError } = useErrorContext();
  const [category, setCategory] = useState<CategoryOptionType>("전체");
  const [orderBy, setOrderBy] = useState<OrderByOptionType>("낮은 가격순");

  const sortParams: Record<OrderByOptionType, string> = {
    "낮은 가격순": "price,asc",
    "높은 가격순": "price,desc",
  };
  const params = new URLSearchParams({
    ...defaultSearchParams,
    sort: sortParams[orderBy],
  });
  productURL.search = params.toString();

  const {
    data: products,
    isLoading: productFetchLoading,
    error: productFetchError,
    fetcher: refetchProducts,
  } = useFetch<ProductResponse>(productURL);

  const {
    data: cartItems,
    fetcher: refetchCart,
    error: cartFetchError,
    isLoading: cartFetchLoading,
  } = useFetch<CartItemResponse>(
    "http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items",
    {
      headers: {
        Authorization: `Basic ${btoa(
          `${import.meta.env.VITE_USER_ID}:${import.meta.env.VITE_PASSWORD}`
        )}`,
        "Content-Type": "application/json",
      },
    }
  );

  useEffect(() => {
    refetchProducts();
  }, [orderBy]);

  useEffect(() => {
    if (productFetchError) {
      showError(productFetchError);
    }
    if (cartFetchError) {
      showError(cartFetchError);
    }
  }, [productFetchError, cartFetchError, showError]);

  // 1.refetch 카트....? 이름이 이상??
  // 2.추가적으로 prop을 드릴링 할가용?
  // 2.1.아니면... useContext로 넘겨줄까?

  async function handleCartButtonClick() {
    await refetchCart();
  }

  // 필요할까요?
  const handleSelectCategory = (value: CategoryOptionType) => {
    setCategory(value);
  };
  const handleOrderBySelect = (value: OrderByOptionType) => {
    setOrderBy(value);
  };
  return (
    <div css={bodyCss}>
      <div style={{ marginBottom: "80px" }}></div>
      <div css={dropdownDivCss}>
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
      {/* 해더는 어디에 위치해 있어야지, 더 적절할까요? */}
      {cartFetchLoading ? (
        <Header />
      ) : (
        <Header
          cartLength={cartItems?.content ? cartItems?.content.length : 0}
        />
      )}
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
          handleCartButtonClick={handleCartButtonClick}
        />
      )}
    </div>
  );
}

export default App;

// URL을 관리하는 훅? function을 제작해봅시다.
// 어쩌면, 이것을 모두 custom hook으로 만들어버리는 것도 좋을 것 같을까요?
// URl, searchParams, options를 모두 받아버리는거죠.

export const productURL = new URL(
  "http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products"
);
const defaultSearchParams = {
  page: "0",
  size: "50",
};
