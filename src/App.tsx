import AppContent from "./AppContent";
import { AppProvider } from "./domain/contexts/AppProvider";

function App() {
  return (
    <>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </>
  );
}

export default App;
