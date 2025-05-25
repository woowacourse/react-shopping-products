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
import { mockCartItems } from "../../mocks/data/cartItems";

type CartModalProps = {
    onClose: () => void;
  };
  
  const CartModal = ({ onClose }: CartModalProps) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }, []);
  
    return (
      <Overlay>
        <ModalContainer>
          <Title>장바구니</Title>
  
          <CartItemList>
            {mockCartItems?.map((item) => (
              <CartItem key={item.id}>
                <ItemImage src={item.product.imageUrl} />
                <ItemDetails>
                  <ItemName>{item.product.name}</ItemName>
                  <ItemPrice>{item.product.price.toLocaleString()}원</ItemPrice>
  
                  <QuantityController
                    id={item.productId}
                    basketId={item.id}
                    timeoutRef={timeoutRef}
                  />
                </ItemDetails>
                <DeleteButton>삭제</DeleteButton>
              </CartItem>
            ))}
          </CartItemList>
  
          <TotalSection>
            <TotalLabel>총 결제 금액</TotalLabel>
            <TotalPrice>
              {mockCartItems
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