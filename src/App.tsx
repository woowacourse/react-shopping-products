import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GlobalStyle from "./styles/reset";
import { ProductPageProvider } from "./pages";

import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <ProductPageProvider />
    </QueryClientProvider>
  );
}

export default App;
