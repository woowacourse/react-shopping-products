import '@styles/App.css';
import '@styles/reset.css';
import '@styles/global.module.css';
import { Header, Layout } from './components';
import { ProductListPage } from './pages';

function App() {
  return (
    <>
      <Header />
      <Layout>
        <ProductListPage />
      </Layout>
    </>
  );
}

export default App;
