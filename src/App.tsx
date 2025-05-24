import "./index.css";
import "./reset.css";
import { useState } from "react";
import ProductContainer from "./components/productContainer/ProductContainer";
import Header from "./components/header/Header";
import CartModal from "./components/cartModal/CartModal";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function modalOpen() {
    setIsOpen(true);
  }

  function modalClose() {
    setIsOpen(false);
  }

  return (
    <div className="container">
      <Header openCartModal={modalOpen} />
      <ProductContainer />
      {isOpen && <CartModal onClose={modalClose} />}
    </div>
  );
}

export default App;
