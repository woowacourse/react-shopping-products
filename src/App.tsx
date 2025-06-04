import { useState } from "react";
import Modal from "./Component/Common/Modal";
import Body from "./Component/Layout/Body";
import Header from "./Component/Layout/Header";
import ProductListContainer from "./Component/Product/ProductListContainer";
import { CartApiProvider, useCartApi } from "./domain/contexts/CartApiContext";
import { ProductsApiProvider } from "./domain/contexts/ProductApiContext";

function App() {
  return (
    <CartApiProvider>
      <ProductsApiProvider>
        <AppContent />
      </ProductsApiProvider>
    </CartApiProvider>
  );
}

export default App;

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartData, cartStatus, refetchCart } = useCartApi();

  const cartItems = cartData ?? [];
  const cartItemCount = cartItems.length;

  return (
    <>
      <div>
        <Header
          onOpenModal={() => setIsModalOpen(true)}
          cartStatus={cartStatus}
          cartItemCount={cartItemCount}
        />
        <Body>
          <ProductListContainer />
        </Body>
      </div>
      <Modal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cartItems={cartItems}
        cartStatus={cartStatus}
        refetchCart={refetchCart}
      />
    </>
  );
}
