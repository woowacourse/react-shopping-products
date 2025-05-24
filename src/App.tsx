import { css } from "@emotion/react";
import ShopPage from "./page/ShopPage";
import GlobalStyle from "./GlobalStyle";
import { ContextProvider } from "./context/ContextProvider";

function App() {
  return (
    <ContextProvider>
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
    </ContextProvider>
  );
}

export default App;
