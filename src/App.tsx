import ProductList from "./components/ProductListPage/ProductList";
import { ErrorToastProvider } from "./store/errorToastContext";
import { CartItemsProvider } from "./store/cartItemsContext";

function App() {
  return (
    <>
      <CartItemsProvider>
        <ErrorToastProvider>
          <ProductList />
        </ErrorToastProvider>
      </CartItemsProvider>
    </>
  );
}

export default App;
