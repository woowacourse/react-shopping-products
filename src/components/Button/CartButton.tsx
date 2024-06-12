import { useModal } from "choco-modal-component";
import { ShoppingCartIcon } from "../../assets";
import { useFetchCartItems } from "../../hooks";
import { CartModal } from "../CartModal/CartModal";
import { BaseButton } from "./BaseButton";
import * as S from "./CartButton.styled";

interface CartButtonProp {
  onClick?: () => void;
}

export const CartButton = ({ onClick }: CartButtonProp) => {
  const { cartItems, isError, isLoading } = useFetchCartItems();
  const { isOpen, openModal, closeModal } = useModal();

  const handleClick = () => {
    onClick?.();
    openModal();
  };

  return (
    <>
      <BaseButton onClick={handleClick} ariaLabel="장바구니 버튼">
        <S.StyledContainer>
          <S.StyledCartButtonImg src={ShoppingCartIcon} alt="" />
          {!isError && !isLoading && <S.StyledCartCount>{cartItems.length}</S.StyledCartCount>}
        </S.StyledContainer>
      </BaseButton>

      <CartModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};
