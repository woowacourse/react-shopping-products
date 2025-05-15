import ErrorBoundary from "./components/ErrorBoundary";
import Fallback from "./components/Fallback";
import ProductPage from "./pages/Product/ProductPage";

function App() {
  return (
    <ErrorBoundary
      fallback={
        <Fallback
          type="error"
          message="애플리케이션을 불러오는 중 에러가 발생했습니다."
        />
      }
    >
      <ProductPage />
    </ErrorBoundary>
  );
}

export default App;
