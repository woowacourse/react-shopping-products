import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import './reset.css';
import styled from '@emotion/styled';
import './app.css';
import ProductItemsWithSkeleton from './components/ProductItemsWithSkeleton';
import ErrorMessage from './components/ErrorMessage';
import Select from './components/Select';
import useProducts from './hooks/useProducts';
import useCartItems from './hooks/useCartItems';
import getProductErrorMessage from './utils/getProductErrorMessage';
import { getCartErrorMessage } from './utils/getCartErrorMessage';

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export type CartItem = {
  id: number;
  quantity: number;
  product: Product;
};

export type Category = '식료품' | '패션잡화' | '전체';
export type PriceOrder = '낮은 가격순' | '높은 가격순';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [priceOrder, setPriceOrder] = useState<PriceOrder>('낮은 가격순');
  const {
    products,
    isLoading: isProductsLoading,
    error: productError,
    fetchProducts,
  } = useProducts();
  const {
    cartItems,
    isLoading: isCartItemsLoading,
    error: cartItemsError,
    fetchCartItems,
    addToCart,
    removeFromCart,
  } = useCartItems();

  const handleCategoryChange = async (category: Category) => {
    setSelectedCategory(category);

    await fetchProducts({
      category,
      priceOrder,
    });
  };

  const handlePriceOrderChange = async (priceOrder: PriceOrder) => {
    setPriceOrder(priceOrder);

    await fetchProducts({
      priceOrder,
      category: selectedCategory,
    });
  };

  useEffect(() => {
    fetchProducts();
    fetchCartItems();
  }, []);

  return (
    <Layout>
      <Header cartItemCount={cartItems.length} />
      {cartItemsError.isError && (
        <ErrorMessage
          errorMessage={getCartErrorMessage(cartItemsError.status)}
        />
      )}
      {productError.isError && (
        <ErrorMessage
          errorMessage={getProductErrorMessage(productError.status)}
        />
      )}
      <ProductPageContainer>
        <ProductPageHeader>bppl 상품 목록</ProductPageHeader>
        <SelectContainer>
          <Select
            optionList={['전체', '식료품', '패션잡화']}
            value={selectedCategory}
            setValue={handleCategoryChange}
            id="category-select"
          />
          <Select
            optionList={['낮은 가격순', '높은 가격순']}
            value={priceOrder}
            setValue={handlePriceOrderChange}
            id="price-order-select"
          />
        </SelectContainer>
        <ProductListContainer>
          <ProductItemsWithSkeleton
            isLoading={isProductsLoading}
            products={products}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cartItems={cartItems}
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
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default App;
