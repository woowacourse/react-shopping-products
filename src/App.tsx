import { ToggleCartItemProvider } from "./components/ToggleCartItemProvider";
import { ToastProvider } from "./components/Toasts/ToastProvider";
import Mall from "./pages/Mall";

function App() {
  return (
    <ToastProvider>
      <ToggleCartItemProvider>
        <Mall />
      </ToggleCartItemProvider>
    </ToastProvider>
  );
}

export default App;
