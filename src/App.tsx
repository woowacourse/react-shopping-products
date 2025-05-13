import GlobalStyle from './ui/styles/globalStyle';
import Layout from './ui/components/Layout/Layout';
import Header from './ui/components/Header/Header';
import ProductSection from './ui/components/ProductSection/ProductSection';
import { Global } from '@emotion/react';

function App() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Layout>
        <Header title="SHOP" />
        <ProductSection />
      </Layout>
    </>
  );
}

export default App;
