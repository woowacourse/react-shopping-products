import '@styles/App.css';
import '@styles/reset.css';
import '@styles/global.css';
import { CartActionErrorModal, Header, Layout, PageRequestError } from '@components/index';
import { CartListContext } from '@contexts/index';
import { useCartList } from '@hooks/index';
import { ProductListPageSkeleton } from '@pages/ProductListPage/Skeleton';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const ProductListPage = lazy(() => import('@pages/ProductListPage'));

function App() {
  const { error, cartListMap, isSuccess } = useCartList();

  return (
    <CartListContext.Provider value={{ cartListMap, isSuccess }}>
      <Header />
      <Layout>
        <ErrorBoundary FallbackComponent={({ error }) => <PageRequestError error={error} />}>
          <Suspense fallback={<ProductListPageSkeleton />}>
            <ProductListPage />
          </Suspense>
        </ErrorBoundary>
      </Layout>
      <CartActionErrorModal error={error} />
    </CartListContext.Provider>
  );
}

export default App;
