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
