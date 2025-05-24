import { css } from "@emotion/css";
import Header from "./components/Header";
import ProductListPage from "./pages/ProductListPage";
import ShoppingCartProvider from "./contexts/shoppingCart/ShoppingCartProvider";
import ProductsProvider from "./contexts/products/ProductsProvider";
import CartModal from "./components/CartModal/CartModal";
import { useState } from "react";
import { APIProvider } from "./contexts/APIProvider/APIProvider";

function App() {
  const [isOepn, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <APIProvider>
      <ProductsProvider>
        <ShoppingCartProvider>
          <div className={AppStyles}>
            <Header onCartClick={handleModal} />
            <ProductListPage />
            <CartModal isOpen={isOepn} onModalClose={handleModal} />
          </div>
        </ShoppingCartProvider>
      </ProductsProvider>
    </APIProvider>
  );
}

export default App;

const AppStyles = css`
  display: flex;
  min-height: 100dvh;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
`;
