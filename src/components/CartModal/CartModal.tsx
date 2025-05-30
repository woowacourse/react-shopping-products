import { useEffect, useRef } from "react";
import {
  CartItem,
  CartItemList,
  CloseButton,
  DeleteButton,
  ItemDetails,
  ItemImage,
  ItemName,
  ItemPrice,
  ModalContainer,
  Overlay,
  Title,
  TotalLabel,
  TotalPrice,
  TotalSection,
} from "./CartModal.styled";
import QuantityController from "../QuantityController/QuantityController";
import { deleteCartItem } from "../../api/cartItems";
import { useCartContext } from "../../contexts/DataContext";

type CartModalProps = {
  onClose: () => void;
};

const handleDeleteProduct = async (
  basketId: number,
  fetchCartItems: () => void,
) => {
  await deleteCartItem(basketId);
  fetchCartItems();
};

const CartModal = ({ onClose }: CartModalProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { cartItems, fetchCartItems } = useCartContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <Overlay data-testid="overlay" onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>장바구니</Title>

        <CartItemList>
          {cartItems?.map((item) => (
            <CartItem key={item.id}>
              <ItemImage src={item.product.imageUrl} />
              <ItemDetails>
                <ItemName>{item.product.name}</ItemName>
                <ItemPrice>{item.product.price.toLocaleString()}원</ItemPrice>
                <QuantityController
                  id={item.productId}
                  basketId={item.id}
                  timeoutRef={timeoutRef}
                  size="small"
                />
              </ItemDetails>
              <DeleteButton
                onClick={() => handleDeleteProduct(item.id, fetchCartItems)}
              >
                삭제
              </DeleteButton>
            </CartItem>
          ))}
        </CartItemList>

        <TotalSection>
          <TotalLabel>총 결제 금액</TotalLabel>
          <TotalPrice>
            {cartItems
              ?.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0)
              .toLocaleString()}
            원
          </TotalPrice>
        </TotalSection>

        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContainer>
    </Overlay>
  );
};

export default CartModal;
