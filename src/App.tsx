import { ToggleCartItemProvider } from "./components/provider/ToggleCartItemProvider";
import { ToastProvider } from "./components/provider/ToastProvider";
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
