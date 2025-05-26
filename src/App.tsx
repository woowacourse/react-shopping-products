import "./index.css";
import "./reset.css";
import ProductContainer from "./components/productContainer/ProductContainer";
import Header from "./components/header/Header";
import CartModal from "./components/cartModal/CartModal";
import useModal from "./hooks/useModal";

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
