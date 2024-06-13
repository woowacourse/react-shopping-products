import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ToastsProvider from "./providers/ToastsProvider";
import Toasts from "./components/_common/Toasts/Toasts";
import ProductPage from "./pages/ProductPage";

import GlobalStyle from "./styles/reset";

import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

function App() {
  return (
    <>
      <GlobalStyle />

      <QueryClientProvider client={queryClient}>
        <ToastsProvider>
          <Toasts />
          <ProductPage />
        </ToastsProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
