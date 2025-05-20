import { css } from "@emotion/react";
import ShopPage from "./page/ShopPage";
import GlobalStyle from "./reset";

function App() {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
      `}
    >
      <GlobalStyle />
      <ShopPage />
    </div>
  );
}

export default App;
