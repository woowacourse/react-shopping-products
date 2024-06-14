import "./App.css";
import { Header } from "./components/Header/Header";
import { Product } from "./components/Product/Product";
import { ToastNotification } from "./components/ToastNotification/ToastNotification";
import useCartItems from "./hooks/useCartItems";
import useProducts from "./hooks/useProducts";

const App = () => {
  const { cartItems, error: cartItemError } = useCartItems();
  const { error: productError } = useProducts();

  return (
    <div id="app">
      <Header quantity={cartItems.length} />

      <>
        {cartItemError && cartItemError instanceof Error && (
          <ToastNotification errorMessage={cartItemError.message} />
        )}
        {productError && productError instanceof Error && (
          <ToastNotification errorMessage={productError.message} />
        )}
      </>

      {!cartItemError && !productError && <Product />}
    </div>
  );
};

export default App;
