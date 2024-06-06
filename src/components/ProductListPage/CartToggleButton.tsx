import styled from "styled-components";
import { useErrorToast } from "@contexts/errorToast/useErrorToast";
import { useCartActions } from "@server/useCartActions";
import { ReactComponent as AddToCartIcon } from "@assets/addToCart.svg";
import { ReactComponent as DeleteFromCartIcon } from "@assets/deleteFromCart.svg";

interface CartToggleButtonProps {
  productId: number;
}

const CartToggleButton = ({ productId }: CartToggleButtonProps) => {
  const { showErrorToast } = useErrorToast();
  const handleError = (error: Error) => showErrorToast(error.message);
  const { addToCart, removeFromCart, isIncludedInCart } = useCartActions(handleError);

  const handleAddToCartClick = async () => {
    await addToCart(productId);
  };

  const handleDeleteFromCartClick = async () => {
    await removeFromCart(productId);
  };

  return (
    <S.ButtonWrapper>
      {isIncludedInCart(productId) ? (
        <S.DeleteFromCartIcon
          role="button"
          aria-label="상품 빼기"
          onClick={handleDeleteFromCartClick}
        />
      ) : (
        <S.AddToCartIcon role="button" aria-label="상품 담기" onClick={handleAddToCartClick} />
      )}
    </S.ButtonWrapper>
  );
};

export default CartToggleButton;

const S = {
  ButtonWrapper: styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-top: 0.8rem;
    width: 100%;
    right: 0;
  `,

  AddToCartIcon: styled(AddToCartIcon)`
    cursor: pointer;
  `,

  DeleteFromCartIcon: styled(DeleteFromCartIcon)`
    cursor: pointer;
  `,
};
