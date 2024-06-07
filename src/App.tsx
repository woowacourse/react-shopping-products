import { useState } from 'react';

import Header from './components/Header/Header';
import Product from './pages/Product';
import GlobalStyles from './styles/Global.style';
import Toast from './components/common/Toast/Toast';
import { ErrorContext } from './store/ErrorContext';

function App() {
  const [error, setError] = useState<Error | null>(null);

  return (
    <>
      <GlobalStyles />
      <ErrorContext.Provider value={{ error, setError }}>
        <Toast />
        <Header />
        <Product />
      </ErrorContext.Provider>
    </>
  );
}

export default App;
