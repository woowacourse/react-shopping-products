import './reset.css';
import styled from '@emotion/styled';
import './app.css';
import ProductPage from './pages/ProductListPage';
import CartItemsProvider from './components/providers/CartItemsProvider';
import ProductsProvider from './components/providers/ProductsProvider';

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
};

export type CartItem = {
  id: number;
  quantity: number;
  product: Product;
};

export type Category = '식료품' | '패션잡화' | '전체';
export type PriceOrder = '낮은 가격순' | '높은 가격순';

function App() {
  return (
    <CartItemsProvider>
      <ProductsProvider>
        <Layout>
          <ProductPage />
        </Layout>
      </ProductsProvider>
    </CartItemsProvider>
  );
}

const Layout = styled.div`
  width: 500px;
  height: 100vh;
  background-color: white;
  margin: 0 auto;
`;

export default App;
