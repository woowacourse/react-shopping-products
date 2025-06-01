import ErrorBoundary from "./components/ErrorBoundary";
import ErrorFallback from "./components/Fallback/ErrorFallback";
import { APIProvider } from "./context/APIContext";
import ProductPage from "./pages/Product/ProductPage";

function App() {
  return (
    <APIProvider>
      <ErrorBoundary
        fallback={
          <ErrorFallback message="애플리케이션을 불러오는 중 에러가 발생했습니다." />
        }
      >
        <ProductPage />
      </ErrorBoundary>
    </APIProvider>
  );
}

export default App;
