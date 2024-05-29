import '@styles/App.css';
import '@styles/reset.css';
import '@styles/global.module.css';
import { ErrorBoundary } from 'react-error-boundary';

import { Header, Layout } from './components';
import { ProductListPage } from './pages';

function App() {
  return (
    <>
      <Header />
      <Layout>
        <ErrorBoundary fallback={<div> 오류.....</div>}>
          <ProductListPage />
        </ErrorBoundary>
      </Layout>
    </>
  );
}

export default App;
