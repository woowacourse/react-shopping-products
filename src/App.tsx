import "./index.css";
import "./reset.css";
import Header from "./components/header/Header";
import ProductContainer from "./components/productContainer/ProductContainer";
import ErrorToast from "./components/errorToast/ErrorToast";
import useError from "./hooks/useError";
import Modal from "./components/modal/Modal";
import { useEffect, useState } from "react";
import { CartProductProvider } from "./hooks/useCartProduct";

function App() {
  const { isError, setErrorTrue, errorMessage } = useError();
  const [isOpen, setIsOpen] = useState(false);

  function handleModalToggle() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="container">
      <CartProductProvider setErrorTrue={setErrorTrue}>
        <Header onOpenModal={handleModalToggle} />
        <ProductContainer setErrorTrue={setErrorTrue} />
        {isError && <ErrorToast errorMessage={errorMessage} />}
        {isOpen && (
          <Modal onClose={handleModalToggle} setErrorTrue={setErrorTrue} />
        )}
      </CartProductProvider>
    </div>
  );
}

export default App;
