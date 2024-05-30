import Mall from "./pages/Mall";
import { ToastProvider } from "./components/Toasts/ToastProvider";

function App() {
  return (
    <ToastProvider>
      <Mall />
    </ToastProvider>
  );
}

export default App;
