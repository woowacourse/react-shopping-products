import { useState } from "react";
import Header from "./components/header/Header";
import "./reset.css";
import styled from "@emotion/styled";
import "./app.css";
import ProductItemsWithSkeleton from "./components/ProductItemsWithSkeleton";
import ErrorMessage from "./components/ErrorMessage";
import Select from "./components/Select";
import useProducts from "./hooks/useProducts";
import Modal from "./components/Modal/Modal";
import CartItems from "./components/ProductItem/CartItems";
import { APIProvider, APIContext } from "./contexts/DataContext";
import { useAPI } from "./hooks/useApi";
import getCartItems from "./api/getCartItems";
import getProducts from "./api/getProducts";
import { useContext } from "react";

function AppContent() {
  const { errorMessage, setErrorMessage, isLoading } = useContext(APIContext);
  useAPI({
    fetcher: getCartItems,
    name: "cartItems",
  });

  const { refetch: refetchProducts } = useAPI({
    fetcher: () => {
      return getProducts({
        category: selectedCategory,
        priceOrder: priceOrder,
      });
    },
    name: "products",
  });

  const {
    handleCategoryChange,
    handlePriceOrderChange,
    selectedCategory,
    priceOrder,
  } = useProducts({
    setErrorMessage,
    refetchProducts,
  });
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const openCartModal = () => {
    if (!isCartModalOpen) setIsCartModalOpen(true);
  };

  return (
    <Layout>
      <Header openCartModal={openCartModal} />
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
          <ProductItemsWithSkeleton isLoading={isLoading} />
        </ProductListContainer>
        <Modal
          isOpen={isCartModalOpen}
          onClose={() => setIsCartModalOpen(false)}
          size="medium"
          position="bottom"
          title="장바구니"
        >
          <CartItems />
        </Modal>
      </ProductPageContainer>
    </Layout>
  );
}

function App() {
  return (
    <APIProvider>
      <AppContent />
    </APIProvider>
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
  height: calc(100vh - 64px - 60px);
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
