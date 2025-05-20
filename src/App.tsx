import "./index.css";
import "./reset.css";
import Header from "./components/header/Header";
import ProductContainer from "./components/productContainer/ProductContainer";
import ErrorToast from "./components/errorToast/ErrorToast";
import useError from "./hooks/useError";
import { CartProvider } from "./hooks/useCart";
import Modal from "./components/modal/Modal";
import { useState } from "react";

function App() {
  const { isError, setErrorTrue, errorMessage } = useError();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="container">
      <CartProvider setErrorTrue={setErrorTrue}>
        <Header />
        <ProductContainer setErrorTrue={setErrorTrue} />
        {isError && <ErrorToast errorMessage={errorMessage} />}
        {isOpen && <Modal setIsOpen={setIsOpen} />}
      </CartProvider>
    </div>
  );
}

export default App;
