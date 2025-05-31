import { css } from "@emotion/react";
import ErrorPopup from "./components/common/ErrorPopup";
import { ErrorProvider, LoadingProvider } from "./contexts";
import ProductPage from "./pages/ProductPage";
import Spinner from "./components/common/Spinner";
import { QueryProvider } from "./contexts/QueryContext";
import Header from "./components/Header";
import { CartModalProvider } from "./contexts/CartModalContext";
import CartModal from "./components/Cart/CartModal";

function App() {
  return (
    <LoadingProvider>
      <ErrorProvider>
        <QueryProvider>
          <CartModalProvider>
            <div css={appStyle}>
              <Spinner />
              <Header />
              <ProductPage />
              <CartModal />
              <ErrorPopup />
            </div>
          </CartModalProvider>
        </QueryProvider>
      </ErrorProvider>
    </LoadingProvider>
  );
}

export default App;

const appStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 430px;
  border-radius: 12px;
  overflow: hidden;
  margin: 0 auto;
  background-color: #fff;
`;
