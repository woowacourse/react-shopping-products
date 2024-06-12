import { Modal, ButtonInterface } from "@seongjinme/react-modal";

import { useCartItemQuantity, useCartItems } from "../../../hooks";
import { CartItem } from "../../../components";

import * as Styled from "./CartModal.style";
import { convertToLocaleAmount } from "../../../utils";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems, handleRemoveCartItem } = useCartItems();
  const { updateQuantity } = useCartItemQuantity();

  const totalAmount = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  const closeButton: ButtonInterface = {
    text: "닫기",
    style: "primary",
    onClick: onClose,
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveCartItem(productId);
      return;
    }
    updateQuantity(productId, newQuantity);
  };

  return (
    <Modal
      isOpen={isOpen}
      title="장바구니"
      position="bottom"
      onClose={onClose}
      buttons={[closeButton]}
      hasCloseButton={false}
    >
      <Styled.CartItemContainer>
        {cartItems.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            product={cartItem.product}
            quantity={cartItem.quantity}
            onUpdateQuantity={(newQuantity: number) =>
              handleUpdateQuantity(cartItem.product.id, newQuantity)
            }
            onRemoveFromCart={() => handleRemoveCartItem(cartItem.product.id)}
          />
        ))}
      </Styled.CartItemContainer>

      <Styled.TotalAmountContainer>
        <Styled.AmountItem>
          <Styled.Title>총 결제 금액</Styled.Title>
          <Styled.Amount>{convertToLocaleAmount(totalAmount)}</Styled.Amount>
        </Styled.AmountItem>
      </Styled.TotalAmountContainer>
    </Modal>
  );
}
