import { ProductsPage } from "./pages/products";
import * as S from "./App.styles";
import { ErrorProvider } from "./context";
import { ErrorPopup } from "./components";
import { QueryProvider } from "./modules";

function App() {
  return (
    <QueryProvider>
      <S.AppWrapper>
        <ErrorProvider>
          <ErrorPopup />
          <ProductsPage />
        </ErrorProvider>
      </S.AppWrapper>
    </QueryProvider>
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

const containerStyle = css`
  padding: 36px 24px;
  display: flex;
  height: calc(100% - 64px);
  flex-direction: column;
  gap: 28px;
`;

const selectBoxStyle = css`
  display: flex;
  justify-content: space-between;
  gap: 132px;
`;

const cardContainerStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 20px;
  justify-items: center;
  overflow-y: scroll;
`;
