import { useErrorToast } from "@src/contexts/errorToast/useErrorToast";
import { useCartActions } from "@src/hooks/useCartItemAction";
import { ReactComponent as AddToCartIcon } from "@assets/addToCart.svg";
import { ReactComponent as DeleteFromCartIcon } from "@assets/deleteFromCart.svg";
import styled from "styled-components";

interface CartToggleButtonProps {
  productId: number;
}

const CartToggleButton = ({ productId }: CartToggleButtonProps) => {
  const { addToCart, removeFromCart, isIncludedInCart } = useCartActions();
  const { showErrorToast } = useErrorToast();

  const handleAddToCartClick = async () => {
    try {
      await addToCart(productId, 1);
    } catch (error) {
      if (error instanceof Error) {
        showErrorToast(error.message);
      }
    }
  };

  const handleDeleteFromCartClick = async () => {
    try {
      await removeFromCart(productId);
    } catch (error) {
      if (error instanceof Error) {
        showErrorToast(error.message);
      }
    }
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
