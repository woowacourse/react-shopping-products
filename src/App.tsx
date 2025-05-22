import { useState } from "react";
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
import Modal from "./components/Modal/Modal";
import CartItems from "./components/ProductItem/CartItems";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoading, withLoading } = useLoading();
  const { cart, addToCart } = useCart({
    setErrorMessage,
  });
  const {
    handleCategoryChange,
    handlePriceOrderChange,
    selectedCategory,
    priceOrder,
    products,
  } = useProducts({
    withLoading,
    setErrorMessage,
  });
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const openCartModal = () => {
    if (!isCartModalOpen) setIsCartModalOpen(true);
  };

  return (
    <Layout>
      <Header cartItemCount={cart.length} openCartModal={openCartModal} />
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
            cart={cart}
          />
        </ProductListContainer>
        <Modal
          isOpen={isCartModalOpen}
          onClose={() => setIsCartModalOpen(false)}
          size="medium"
          position="bottom"
          title="장바구니"
        >
          <CartItems cart={cart} />
        </Modal>
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
