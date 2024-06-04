import { ToggleCartItemProvider } from "./components/provider/ToggleCartItemProvider";
import { ToastProvider } from "./components/provider/ToastProvider";
import { LanguageProvider } from "./components/provider/LanguageProvider";
import { ModalProvider } from "easy-payments-ui";

import Mall from "./pages/Mall";

function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <ToggleCartItemProvider>
          <ModalProvider>
            <Mall />
          </ModalProvider>
        </ToggleCartItemProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}

export default App;
