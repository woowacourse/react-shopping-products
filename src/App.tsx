import '@styles/App.css';
import '@styles/reset.css';
import '@styles/global.css';
import { PageRequest } from '@components/Fallbacks';
import { Header, Layout } from '@components/index';
import { ErrorBoundary } from 'react-error-boundary';
import { ProductListPage } from './pages';
import useLoadCartItems from './hooks/useLoadCartItems';

function App() {
  const { cartItems, refetch } = useLoadCartItems();

  return (
    <>
      <Header cartItemsLength={cartItems.length} />
      <Layout>
        <ErrorBoundary FallbackComponent={({ error }) => <PageRequest error={error} />}>
          <ProductListPage cartItems={cartItems} refetch={refetch} />
        </ErrorBoundary>
      </Layout>
    </>
  );
}

export default App;
