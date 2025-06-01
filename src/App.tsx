import { useState } from "react";
import Modal from "./Component/Common/Modal";
import Body from "./Component/Layout/Body";
import Header from "./Component/Layout/Header";
import ProductListContainer from "./Component/Product/ProductListContainer";
import { APIProvider } from "./domain/contexts/APIContext";
import { useAPI } from "./domain/contexts/APIContext";
import getShoppingCart from "./api/shoppingCart/getShoppingCart";

function App() {
  return (
    <APIProvider>
      <AppContent />
    </APIProvider>
  );
}

export default App;

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: cartData,
    status: cartStatus,
    refetch: refetchCart,
  } = useAPI({
    fetcher: () => getShoppingCart(),
    name: "cart",
  });

  const cartItems = cartData?.content ?? [];
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
