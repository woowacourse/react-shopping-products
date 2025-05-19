import { css } from "@emotion/react";
import ErrorPopup from "./components/common/ErrorPopup";
import { ErrorProvider, LoadingProvider } from "./contexts";
import ProductPage from "./pages/ProductPage";
import Spinner from "./components/common/Spinner";

function App() {
  return (
    <LoadingProvider>
      <ErrorProvider>
        <div css={appStyle}>
          <ProductPage />
          <ErrorPopup />
          <Spinner />
        </div>
      </ErrorProvider>
    </LoadingProvider>
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
