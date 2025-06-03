import * as S from "./Header.styled";
import BagIcon from "../Icon/BagIcon";
import { useState } from "react";
import CartModal from "../CartModal/CartModal";
import { useCart } from "../../hooks/useCart";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartItemList } = useCart();

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

      <CartModal isOpen={isModalOpen} onClose={handleModalClose} />
    </>
  );
}

export default Header;
