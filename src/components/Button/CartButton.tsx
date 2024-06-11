import { useModal } from "choco-modal-component";
import { ShoppingCartIcon } from "../../assets";
import { useFetchCartItems } from "../../hooks/useFetchCartItems";
import { CartModal } from "../CartModal/CartModal";
import { BaseButton } from "./BaseButton";
import { StyledCartButtonImg, StyledCartCount, StyledContainer } from "./CartButton.styled";

interface CartButtonProps {
  onClick?: () => void;
}
export const CartButton = ({ onClick = () => {} }: CartButtonProps) => {
  const { cartItems, isError, isLoading } = useFetchCartItems();
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
          {!isError && !isLoading && <StyledCartCount>{cartItems.length}</StyledCartCount>}
        </StyledContainer>
      </BaseButton>

      <CartModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};
