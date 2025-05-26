import * as S from "./Header.styled";
import BagIcon from "../Icon/BagIcon";
import { ResponseCartItem } from "../../api/types";
import { useState } from "react";
import CartModal from "../CartModal/CartModal";

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

      <CartModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        cartItemList={cartItemList}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
        onIncreaseQuantity={onIncreaseQuantity}
        onDecreaseQuantity={onDecreaseQuantity}
        getCartQuantityForProduct={getCartQuantityForProduct}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
}

export default Header;
