import { css } from "@emotion/react";
import ShopPage from "./domains/ShoppingProducts/page";
import GlobalStyle from "./GlobalStyle";
import { ShoppingProvider } from "./domains/ShoppingProducts/context/ShoppingProvider";

function App() {
  return (
    <ShoppingProvider>
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
    </ShoppingProvider>
  );
}

export default App;
