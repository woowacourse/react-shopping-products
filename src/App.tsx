import AppLayout from '@components/layout/AppLayout/AppLayout';
import { Global } from '@emotion/react';
import ProductPage from '@pages/ProductPage/ProductPage';

import { resetCSS } from '@styles/resetCSS';

function App() {
  return (
    <>
      <Global styles={resetCSS} />
      <AppLayout>
        <ProductPage />
      </AppLayout>
    </>
  );
}

export default App;
