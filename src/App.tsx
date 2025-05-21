import AppContent from "./AppContent";
import { CartProvider } from "./contexts/CartProvider";

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
