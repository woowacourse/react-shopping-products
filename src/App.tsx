import Layout from './ui/components/Layout/Layout';
import { Global } from '@emotion/react';
import GlobalStyle from './ui/styles/globalStyle';

function App() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Layout>자식</Layout>
    </>
  );
}

export default App;
