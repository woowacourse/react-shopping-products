import { useEffect } from 'react';
import Header from './components/header/Header';
import './reset.css';
import styled from '@emotion/styled';
import './app.css';
import ErrorMessage from './components/ErrorMessage';
import useProducts from './hooks/useProducts';
import useCartItems from './hooks/useCartItems';
import getProductErrorMessage from './utils/getProductErrorMessage';
import getCartErrorMessage from './utils/getCartErrorMessage';
import ProductPage from './pages/ProductPage';

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
      <ProductPage
        products={products}
        fetchProducts={fetchProducts}
        cartItems={cartItems}
        isCartItemsLoading={isCartItemsLoading}
        isLoading={isProductsLoading}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </Layout>
  );
}

const Layout = styled.div`
  width: 500px;
  height: 100vh;
  background-color: white;
  margin: 0 auto;
`;

export default App;
