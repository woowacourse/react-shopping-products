import { Global } from '@emotion/react';
import ProductPage from '@pages/ProductPage/ProductPage';
import { resetCSS } from '@styles/resetCSS';

function App() {
  return (
    <>
      <Global styles={resetCSS} />
      <ProductPage />
    </>
  );
}

export default App;
