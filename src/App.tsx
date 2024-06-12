import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Header } from "./components/Header/Header";
import { ProductSection } from "./components/ProductSection/ProductSection";
import ToastNotification from "./components/ToastNotification/ToastNotification";
import { useToast } from "./hooks";

const App = () => {
  const { showToast, toastMessage } = useToast();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        showToast(error.message);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        showToast(error.message);
      },
    }),
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <ProductSection />
        {toastMessage && <ToastNotification message={toastMessage} />}
      </QueryClientProvider>
    </>
  );
};

export default App;
