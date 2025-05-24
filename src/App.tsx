import { css } from '@emotion/css';
import Header from './components/Header';
import ProductListPage from './pages/ProductListPage';
import ShoppingCartProvider from './contexts/ShoppingCartProvider';
import DataProvider from './contexts/DataContextProvider';
import ProductsProvider from './contexts/ProductsProvider';

function App() {
  return (
    <DataProvider>
      <ProductsProvider>
        <ShoppingCartProvider>
          <div className={AppStyles}>
            <Header />
            <ProductListPage />
          </div>
        </ShoppingCartProvider>
      </ProductsProvider>
    </DataProvider>
  );
}

export default App;

const AppStyles = css`
  display: flex;
  min-height: 100dvh;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
`;
