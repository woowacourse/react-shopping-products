import { css } from '@emotion/css';
import ProductListPage from './pages/ProductListPage';
import DataProvider from './contexts/DataContextProvider';

function App() {
  return (
    <DataProvider>
      <div className={AppStyles}>
        <ProductListPage />
      </div>
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
