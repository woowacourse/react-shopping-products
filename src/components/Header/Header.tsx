import * as S from "./Header.styled";
import BagIcon from "../Icon/BagIcon";
import { ResponseCartItem } from "../../api/types";
import { useState } from "react";
import Modal from "../common/Modal/Modal";
import ProductItem from "../ProductItem/ProductItem";
import React from "react";

interface HeaderProps {
  cartItemList: ResponseCartItem[];
  onAddToCart: (productId: number, quantity: number) => Promise<void>;
  onRemoveFromCart: (cartItemId: number) => Promise<void>;
  onIncreaseQuantity: (productId: number) => Promise<void>;
  onDecreaseQuantity: (productId: number) => Promise<void>;
  getCartQuantityForProduct: (productId: number) => number;
  setErrorMessage: (message: string) => void;
}

function Header({
  cartItemList,
  onAddToCart,
  onRemoveFromCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  getCartQuantityForProduct,
  setErrorMessage,
}: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const totalPrice = cartItemList.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <S.HeaderContainer>
        <S.HeaderTitle>SHOP</S.HeaderTitle>
        <S.HeaderIconContainer onClick={handleModalOpen}>
          <BagIcon />
          {cartItemList.length > 0 && (
            <S.CartBadge>{cartItemList.length}</S.CartBadge>
          )}
        </S.HeaderIconContainer>
      </S.HeaderContainer>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <S.ModalContent>
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
                  <ProductItem
                    product={item.product}
                    cartItemList={cartItemList}
                    onAddToCart={onAddToCart}
                    onRemoveFromCart={onRemoveFromCart}
                    setErrorMessage={setErrorMessage}
                    onIncreaseQuantity={onIncreaseQuantity}
                    onDecreaseQuantity={onDecreaseQuantity}
                    getCartQuantityForProduct={getCartQuantityForProduct}
                    isInModal={true}
                  />
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
                <S.CloseButton>닫기</S.CloseButton>
              </S.CartSummary>
            </>
          )}
        </S.ModalContent>
      </Modal>
    </>
  );
}

export default Header;
