import { css } from "@emotion/react";
import ErrorPopup from "./components/ErrorPopup";
import { ErrorProvider } from "./contexts";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <ErrorProvider>
      <div css={appStyle}>
        <ProductPage />
        <ErrorPopup />
      </div>
    </ErrorProvider>
  );
}

export default App;

const appStyle = css`
  position: relative;
  width: 100%;
  height: 100vh;
  max-width: 430px;
  margin: 0 auto;
  background-color: #fff;
`;
