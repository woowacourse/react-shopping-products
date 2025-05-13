import Layout from './ui/components/Layout/Layout';
import { Global } from '@emotion/react';
import GlobalStyle from './ui/styles/globalStyle';
import Header from './ui/components/Header/Header';

function App() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Layout>
        <Header title="SHOP" />
      </Layout>
    </>
  );
}

export default App;
