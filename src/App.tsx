import AppLayout from '@components/layout/AppLayout/AppLayout';
import { Global } from '@emotion/react';
import ProductPage from '@pages/ProductPage/ProductPage';

import { resetCSS } from '@styles/resetCSS';

import useCheckedIds from '@hooks/product/useCheckedId';

function App() {
  const { length, getIsCheckedId, toggleId } = useCheckedIds();
  return (
    <>
      <Global styles={resetCSS} />
      <AppLayout itemCount={length}>
        <ProductPage getIsCheckedId={getIsCheckedId} toggleId={toggleId} />
      </AppLayout>
    </>
  );
}

export default App;
