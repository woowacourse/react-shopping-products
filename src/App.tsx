import { ProductsPage } from "./pages/products";
import * as S from "./App.styles";
import { ErrorProvider } from "./context";
import { ErrorPopup } from "./components";
import QueryProvider from "./modules/Query/QueryProvider";

function App() {
  return (
    <QueryProvider>
      <S.Container>
        <ErrorProvider>
          <ErrorPopup />
          <ProductsPage />
        </ErrorProvider>
      </S.Container>
    </QueryProvider>
  );
}

export default App;
