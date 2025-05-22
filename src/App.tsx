import ErrorBoundary from "./components/ErrorBoundary";
import ErrorFallback from "./components/Fallback/ErrorFallback";
import { DataProvider } from "./context/DataContext";
import ProductPage from "./pages/Product/ProductPage";

function App() {
  return (
    <DataProvider>
      <ErrorBoundary
        fallback={
          <ErrorFallback message="애플리케이션을 불러오는 중 에러가 발생했습니다." />
        }
      >
        <ProductPage />
      </ErrorBoundary>
    </DataProvider>
  );
}

export default App;
