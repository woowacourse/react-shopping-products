import "./App.css";
import { Header } from "./components/Header/Header";
import { ProductSection } from "./components/ProductSection/ProductSection";
import { ToastNotification } from "./components/ToastNotification/ToastNotification";
import { CartProvider } from "./context/cartContext";

const App = () => {
  return (
    <CartProvider>
      <Header />
      <ToastNotification />
      <ProductSection />
    </CartProvider>
  );
};

export default App;
