import { useEffect, useState } from "react";
import getProducts from "./api/getProducts";
import Header from "./components/header/Header";
import "./reset.css";
import styled from "@emotion/styled";
import "./app.css";
import ProductItemsWithSkeleton from "./components/ProductItemsWithSkeleton";
import ErrorMessage from "./components/ErrorMessage";
import Select from "./components/Select";
import useLoading from "./hooks/useLoading";
import useCart from "./hooks/useCart";
import useProducts from "./hooks/useProducts";

export const PRODUCT_TYPE_COUNT = 20;
export const CART_MAX_COUNT = 50;

function App() {
  const [errorMessage, setErrorMessage] = useState("");

  const { isLoading, withLoading } = useLoading();
  const { cart, addToCart, removeFromCart, syncCart } = useCart({
    setErrorMessage,
  });
  const {
    handleCategoryChange,
    handlePriceOrderChange,
    selectedCategory,
    priceOrder,
    products,
    setProducts,
  } = useProducts({
    withLoading,
    setErrorMessage,
  });

  useEffect(() => {
    const fetchData = async () => {
      await withLoading(async () => {
        const { data, newErrorMessage: getProductErrorMessage } =
          await getProducts();
        setErrorMessage(getProductErrorMessage);
        if (!getProductErrorMessage) {
          await syncCart();
          setProducts(data.content.slice(0, PRODUCT_TYPE_COUNT));
        }
      });
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Header cartItemCount={cart.length} />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      <ProductPageContainer>
        <ProductPageHeader>bppl 상품 목록</ProductPageHeader>
        <SelectContainer>
          <Select
            optionList={["전체", "식료품", "패션잡화"]}
            value={selectedCategory}
            setValue={handleCategoryChange}
            id="category-select"
          />
          <Select
            optionList={["낮은 가격순", "높은 가격순"]}
            value={priceOrder}
            setValue={handlePriceOrderChange}
            id="price-order-select"
          />
        </SelectContainer>
        <ProductListContainer>
          <ProductItemsWithSkeleton
            isLoading={isLoading}
            products={products}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cart={cart}
          />
        </ProductListContainer>
      </ProductPageContainer>
    </Layout>
  );
}

const Layout = styled.div`
  width: 500px;
  height: 100vh;
  background-color: white;
  margin: 0 auto;
`;

const ProductPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 30px 25px;
  height: calc(100vh - 64px - 60px);};

`;

const ProductPageHeader = styled.div`
  font-size: 28px;
  font-weight: 700;
`;

const SelectContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const ProductListContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
  overflow-x: hidden;
  overflow-y: auto;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default App;
