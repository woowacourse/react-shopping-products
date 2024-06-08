import { Modal } from "harrysimodal";

import useFetchCartItem from "../../hooks/cart-items/useFetchCartItem";

import CartItemComponent from "../CartItem/CartItem";
import PriceInfoBox from "../PriceInfoBox/PriceInfoBox";

import * as Styled from "./CartItemModal.style";

interface CartItemModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export default function CartItemModal({ isModalOpen, closeModal }: CartItemModalProps) {
  const { cartItems, cartItemLength, totalPrice } = useFetchCartItem();

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      position="bottom"
    >
      <Modal.ModalContent size="full">
        <Modal.ModalHeader>
          <Modal.ModalTitle text="장바구니" />
        </Modal.ModalHeader>
        {cartItemLength === 0 ? (
          <Styled.EmptyCart>장바구니에 담은 상품이 없어요 :)</Styled.EmptyCart>
        ) : (
          <>
            <Styled.CartItemList>
              {cartItems.map((item) => (
                <CartItemComponent item={item} />
              ))}
            </Styled.CartItemList>
            <PriceInfoBox
              priceLabel="총 결제 금액"
              price={totalPrice ?? 0}
            />
          </>
        )}
        <Modal.ModalFooter
          direction="row"
          justify="between"
        >
          <Modal.ModalButton
            theme="dark"
            onClick={closeModal}
          >
            닫기
          </Modal.ModalButton>
        </Modal.ModalFooter>
      </Modal.ModalContent>
    </Modal>
  );
}
