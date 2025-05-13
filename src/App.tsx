import Layout from './ui/components/Layout/Layout';
import { Global } from '@emotion/react';
import GlobalStyle from './ui/styles/globalStyle';
import Header from './ui/components/Header/Header';
import ProductSection from './ui/components/ProductSection/ProductSection';

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
