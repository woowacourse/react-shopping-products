import * as S from "./CartModal.styled";
import { useEffect } from "react";
import ProductItem from "../ProductItem/ProductItem";
import React from "react";
import { useCart } from "../../context/CartContext";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItemList } = useCart();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const totalPrice = cartItemList.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <>
      <S.ModalBackdrop onClick={onClose} />
      <S.ModalOverlay>
        <S.ModalContent onClick={(e) => e.stopPropagation()}>
          <S.ModalHeader>
            <S.ModalTitle>장바구니</S.ModalTitle>
          </S.ModalHeader>

          <S.ModalDivider />

          <S.CartItemsContainer>
            {cartItemList.length === 0 ? (
              <S.EmptyCartMessage>장바구니가 비어있습니다.</S.EmptyCartMessage>
            ) : (
              cartItemList.map((item, index) => (
                <React.Fragment key={item.id}>
                  <ProductItem product={item.product} isInModal={true} />
                  {index < cartItemList.length - 1 && <S.ModalDivider />}
                </React.Fragment>
              ))
            )}
          </S.CartItemsContainer>

          {cartItemList.length > 0 && (
            <>
              <S.ModalDivider />
              <S.CartSummary>
                <S.TotalPriceContainer>
                  <S.TotalPriceLabel>총 결제금액</S.TotalPriceLabel>
                  <S.TotalPrice>{totalPrice.toLocaleString()}원</S.TotalPrice>
                </S.TotalPriceContainer>
                <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
              </S.CartSummary>
            </>
          )}
        </S.ModalContent>
      </S.ModalOverlay>
    </>
  );
}

export default CartModal;
