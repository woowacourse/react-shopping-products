import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductListPage from "./pages/ProductListPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductListPage />
    </QueryClientProvider>
  );
}

export default App;
