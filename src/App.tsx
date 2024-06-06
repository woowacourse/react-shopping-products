import { ToggleCartItemProvider } from "./components/provider/ToggleCartItemProvider";
import { ToastProvider } from "./components/provider/ToastProvider";
import { LanguageProvider } from "./components/provider/LanguageProvider";
import { ModalProvider } from "easy-payments-ui";

import Mall from "./pages/Mall";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
      <LanguageProvider>
        <ToastProvider>
          <ToggleCartItemProvider>
            <ModalProvider>
              <Mall />
            </ModalProvider>
          </ToggleCartItemProvider>
        </ToastProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
