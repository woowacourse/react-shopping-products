import "./index.css";
import "./reset.css";
import Header from "./components/header/Header";
import useModal from "./hooks/useModal";
import CartModal from "./components/cartModal/CartModal";
import ProductContainer from "./components/productContainer/ProductContainer";

function App() {
  const { isOpen, modalClose, modalOpen } = useModal();

  return (
    <div className="container">
      <Header openCartModal={modalOpen} />
      <ProductContainer />
      {isOpen && <CartModal onClose={modalClose} />}
    </div>
  );
}

export default App;
