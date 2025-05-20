import { ProductsPage } from "./pages/products";
import * as S from "./App.styles";
import { ErrorProvider } from "./context";
import { ErrorPopup } from "./components";
import QueryClientProvider from "./modules/Query/QueryClientProvider/QueryClientProvider";

function App() {
  return (
    <QueryClientProvider>
      <S.Container>
        <ErrorProvider>
          <ErrorPopup />
          <ProductsPage />
        </ErrorProvider>
      </S.Container>
    </QueryClientProvider>
  );
}

export default App;
