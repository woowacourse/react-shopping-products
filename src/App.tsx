import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GlobalStyle from "./styles/reset";
import ProductPage from "./pages/ProductPage";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <ProductPage />
    </QueryClientProvider>
  );
}

export default App;
