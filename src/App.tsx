import { ApiProvider } from "./context/ApiContext/ApiContext";
import ProductListPage from "./page/ProductListPage";

function App() {
  return (
    <ApiProvider>
      <ProductListPage />
    </ApiProvider>
  );
}

export default App;
