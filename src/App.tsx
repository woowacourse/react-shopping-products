import "./index.css";
import "./reset.css";
import Header from "./components/header/Header";
import ProductContainer from "./components/productContainer/ProductContainer";
import ErrorToast from "./components/errorToast/ErrorToast";
import useError from "./hooks/useError";
import { CartProvider } from "./hooks/useCart";

function App() {
  const { isError, setErrorTrue, errorMessage } = useError();

  return (
    <div className="container">
      <CartProvider setErrorTrue={setErrorTrue}>
        <Header />
        <ProductContainer setErrorTrue={setErrorTrue} />
        {isError && <ErrorToast errorMessage={errorMessage} />}
      </CartProvider>
    </div>
  );
}

export default App;
