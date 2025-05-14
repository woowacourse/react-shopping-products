import GlobalStyle from './ui/styles/globalStyle';
import Layout from './ui/components/Layout/Layout';
import Header from './ui/components/Header/Header';
import Toast from './ui/components/Toast/Toast';
import ProductSection from './ui/components/ProductSection/ProductSection';
import { Global } from '@emotion/react';
import { useState } from 'react';
import LoadingSpinner from './ui/components/LoadingSpinner/LoadingSpinner';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <>
      <Global styles={GlobalStyle} />
      <Layout>
        <Header title="SHOP" />
        {isError && (
          <Toast message="오류가 발생했습니다. 잠시 후 다시 시도해 주세요." />
        )}
        {isLoading && <LoadingSpinner duration={2} />}
        {!isLoading && <ProductSection />}
      </Layout>
    </>
  );
}

export default App;
