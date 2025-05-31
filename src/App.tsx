import { ApiProvider } from "./context/ApiContext/ApiContext";
import { ToastProvider } from "./context/ToastContext/ToastContext";
import ProductListPage from "./page/ProductListPage";

function App() {
  return (
    <ToastProvider>
      <ApiProvider>
        <ProductListPage />
      </ApiProvider>
    </ToastProvider>
  );
}

export default App;
