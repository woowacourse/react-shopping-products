import { ToastProvider } from "./components/Toasts/ToastProvider";
import Mall from "./pages/Mall";

function App() {
  return (
    <ToastProvider>
      <Mall />
    </ToastProvider>
  );
}

export default App;
