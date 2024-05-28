import { useState } from 'react';
import ProductListPage from './pages/ProductListPage/ProductListPage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ProductListPage />
    </>
  );
}

export default App;
