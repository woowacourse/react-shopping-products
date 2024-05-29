import { Global } from '@emotion/react';
import Products from '@/pages/Products';
import baseStyle from '@/style/base.style';

function App() {
  return (
    <>
      <Global styles={baseStyle} />
      <Products />
    </>
  );
}

export default App;
