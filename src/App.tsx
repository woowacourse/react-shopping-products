import { ToggleCartItemProvider } from "./components/provider/ToggleCartItemProvider";
import { useToast } from "./components/provider/ToastProvider";
import { LanguageProvider } from "./components/provider/LanguageProvider";
import { ModalProvider } from "easy-payments-ui";

import Mall from "./pages/Mall";

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const { failAlert } = useToast();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => failAlert(error.message),
    }),
    mutationCache: new MutationCache({
      onError: (error) => failAlert(error.message),
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ToggleCartItemProvider>
          <ModalProvider>
            <Mall />
          </ModalProvider>
        </ToggleCartItemProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
