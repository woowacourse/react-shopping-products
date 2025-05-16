import { ProductsPage } from "./pages/products";
import * as S from "./App.styles";
import { ErrorProvider } from "./context";
import { ErrorPopup } from "./components";

function App() {
  return (
    <S.Container>
      <ErrorProvider>
        <ErrorPopup />
        <ProductsPage />
      </ErrorProvider>
    </S.Container>
  );
}

export default App;
