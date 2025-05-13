import { useEffect } from 'react';
import { getProducts } from './services/productServices';
import Layout from './pages/Layout';
import { ProductListPage } from './pages/ProductListPage';

function App() {
  useEffect(() => {
    (async () => {
      const data = await getProducts();
      console.log(data);
    })();
  }, []);
  return (
    <Layout>
      <ProductListPage />
    </Layout>
  );
}

export default App;
