import { useModal } from "choco-modal-component";
import { ShoppingCartIcon } from "../../assets";
import { useCart } from "../../context/cartContext";
import { CartModal } from "../CartModal/CartModal";
import { BaseButton } from "./BaseButton";
import { StyledCartButtonImg, StyledCartCount, StyledContainer } from "./CartButton.styled";

interface CartButtonProps {
  onClick?: () => void;
}

export const CartButton = ({ onClick = () => {} }: CartButtonProps) => {
  const { cartItems } = useCart();
  const { isOpen, openModal, closeModal } = useModal();

  const handleClick = () => {
    onClick();
    openModal();
  };

  return (
    <>
      <BaseButton onClick={handleClick}>
        <StyledContainer>
          <StyledCartButtonImg src={ShoppingCartIcon} alt="" />
          <StyledCartCount>{cartItems.length}</StyledCartCount>
        </StyledContainer>
      </BaseButton>

      <CartModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};
