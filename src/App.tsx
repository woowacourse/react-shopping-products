import '@styles/App.css';
import '@styles/reset.css';
import '@styles/global.css';
import { CartActionError, PageRequest } from '@components/Fallbacks';
import { Header, Layout, ToastModal } from '@components/index';
import { ErrorBoundary } from 'react-error-boundary';
import { ProductListPage } from './pages';
import useLoadCartItems from '@queries/cart/useLoadCartItems';

function App() {
  const { cartItems, isError } = useLoadCartItems();

  return (
    <>
      <Header cartItemsLength={cartItems?.length ?? 0} />
      <Layout>
        <ErrorBoundary FallbackComponent={({ error }) => <PageRequest error={error} />}>
          <ProductListPage cartItems={cartItems ?? []} />
        </ErrorBoundary>
      </Layout>
      {isError && (
        <ToastModal isError={isError} position={{ top: 40 }}>
          <CartActionError />
        </ToastModal>
      )}
    </>
  );
}

export default App;
