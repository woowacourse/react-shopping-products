import { useState } from "react";
import ErrorToast from "@components/ErrorToast/ErrorToast";
import Header from "@components/Header/Header";
import ProductList from "@components/ProductList/ProductList";
import { CartItemsProvider } from "@context/CartItemsContext";
import { ErrorProvider } from "@context/ErrorContext";
import { Modal } from "soha-components";
import ModalInner from "@components/ModalInner/ModalInner";

import * as PLP from "./ProductListPage.style";

const ProductListPage = () => {
  const [openModal, setOpenModal] = useState(true);

  return (
    <ErrorProvider>
      <CartItemsProvider>
        <PLP.Top>
          <Header />
          <ErrorToast />
        </PLP.Top>

        <PLP.Body>
          <ProductList />
        </PLP.Body>
        {openModal && (
          <Modal
            position="bottom"
            title="장바구니"
            closeModalClick={() => setOpenModal(false)}
            buttonText="닫기"
            buttonClick={() => setOpenModal(false)}
          >
            <ModalInner />
          </Modal>
        )}
      </CartItemsProvider>
    </ErrorProvider>
  );
};

export default ProductListPage;
