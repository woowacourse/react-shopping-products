import '@styles/App.css';
import '@styles/reset.css';
import '@styles/global.css';
import { Header, Layout, PageRequestError } from '@components/index';
import { ErrorBoundary } from 'react-error-boundary';

import { CartItemsContext } from './contexts';
import { useCartItemIds } from './hooks';
import { ProductListPage } from './pages';

function App() {
  const { cartItemIds, refreshCartItemIds, error: cartItemsFetchError } = useCartItemIds();

  const cartItemsLength = cartItemIds ? Array.from(cartItemIds).length : 0;
  return (
    <>
      <Header cartItemsLength={cartItemsLength} cartItemsFetchError={cartItemsFetchError} />
      <Layout>
        <ErrorBoundary FallbackComponent={({ error }) => <PageRequestError error={error} />}>
          <CartItemsContext.Provider value={{ cartItemIds, refreshCartItemIds }}>
            <ProductListPage />
          </CartItemsContext.Provider>
        </ErrorBoundary>
      </Layout>
    </>
  );
}

export default App;
