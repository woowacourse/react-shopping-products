import { UpArrow } from '@assets/svg';
import { Global } from '@emotion/react';
import { resetCSS } from '@styles/resetCSS';

function App() {
  return (
    <>
      <Global styles={resetCSS} />
      <UpArrow />
    </>
  );
}

export default App;
