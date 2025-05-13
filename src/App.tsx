import Layout from './ui/components/Layout/Layout';
import { Global } from '@emotion/react';
import GlobalStyle from './ui/styles/globalStyle';
import Header from './ui/components/Header/Header';
import Title from './ui/components/Title/Title';

function App() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Layout>
        <Header title="SHOP" />
        <Title title="bpple 상품 목록" />
      </Layout>
    </>
  );
}

export default App;
