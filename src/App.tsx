import { useState } from "react";
import Modal from "./Component/Common/Modal";
import Body from "./Component/Layout/Body";
import Header from "./Component/Layout/Header";
import ProductListContainer from "./Component/Product/ProductListContainer";
import { CartApiProvider, useCartApi } from "./domain/contexts/CartApiContext";
import {
  ProductsApiProvider,
  useProductsApi,
} from "./domain/contexts/ProductApiContext";

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
  // const { productsData, productsStatus } = useProductsApi();
  // const { productsData, productsStatus, productsError, refetchProducts } = useProductsApi();

  const cartItems = cartData ?? [];
  const cartItemCount = cartItems.length;

  console.log("cartItems: ", cartItems);

  return (
    <>
      <div>
        <Header
          onOpenModal={() => setIsModalOpen(true)}
          cartStatus={cartStatus}
          cartItemCount={cartItemCount}
        />
        <Body>
          {/* <ProductListContainer products={productsData ?? []} /> */}
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
