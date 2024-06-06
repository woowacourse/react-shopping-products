import { QueryClientProvider } from "@tanstack/react-query";
import ProductListPage from "@pages/ProductListPage";
import { queryClient } from "@server/queryClient";

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
