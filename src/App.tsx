import Products from '@/pages/Products';

import baseStyle from '@/styles/base.style';
import { Global } from '@emotion/react';

function App() {
  return (
    <>
      <Global styles={baseStyle} />
      <Products />
    </>
  );
}

export default App;
