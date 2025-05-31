import "./index.css";
import "./reset.css";
import Header from "./components/header/Header";
import ProductContainer from "./components/productContainer/ProductContainer";
import ErrorToast from "./components/errorToast/ErrorToast";
import Modal from "./components/modal/Modal";
import { useEffect, useState } from "react";
import { CartProductProvider } from "./hooks/useCartProduct";
import { ErrorProvider } from "./hooks/useError";

function App() {
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
      <ErrorProvider>
        <CartProductProvider>
          <Header onOpenModal={handleModalToggle} />
          <ProductContainer />
          <ErrorToast />
          {isOpen && <Modal onClose={handleModalToggle} />}
        </CartProductProvider>
      </ErrorProvider>
    </div>
  );
}

export default App;
