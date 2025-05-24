import { css } from "@emotion/react";
import ShopPage from "./page/ShopPage";
import GlobalStyle from "./GlobalStyle";
import { CartProvider } from "./hook/CartContext";

function App() {
  return (
    <CartProvider>
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
    </CartProvider>
  );
}

export default App;
