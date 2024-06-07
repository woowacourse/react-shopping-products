import Header from "./components/Header/Header";
import Product from "./pages/Product";
import GlobalStyles from "./styles/Global.style";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <Header />
        <Product />
      </QueryClientProvider>
    </>
  );
}

export default App;
