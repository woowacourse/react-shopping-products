import { QueryClientProvider } from "@tanstack/react-query";
import ProductFeedPage from "@pages/ProductFeedPage";
import { queryClient } from "@serverState/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductFeedPage />
    </QueryClientProvider>
  );
}

export default App;
