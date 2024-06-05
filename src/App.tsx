import ProductListPage from "@pages/ProductListPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ProductListPage />
      </QueryClientProvider>
    </>
  );
}

export default App;
