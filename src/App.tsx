import { css } from "@emotion/react";
import ShopPage from "./page/ShopPage";
import GlobalStyle from "./GlobalStyle";

function App() {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        height: 100vh;
        background-color: aliceblue;
      `}
    >
      <GlobalStyle />
      <ShopPage />
    </div>
  );
}

export default App;
