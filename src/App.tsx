import AppContent from "./AppContent";
import { CartProvider } from "./domain/contexts/CartProvider";

function App() {
  return (
    <>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </>
  );
}

export default App;
