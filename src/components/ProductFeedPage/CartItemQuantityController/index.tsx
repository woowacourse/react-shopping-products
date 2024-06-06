import { useErrorToast } from "@src/contexts/errorToast/useErrorToast";
import CartItemCounter from "./CartItemCounter";
import CartItemAddButton from "./CartItemAddButton";
import { useCartItemQuantityControl } from "@src/server/hooks/useCartItemQuantityControl";
import styled from "styled-components";

interface CartItemQuantityControllerProps {
  productId: number;
}

const CartItemQuantityController = ({ productId }: CartItemQuantityControllerProps) => {
  const { showErrorToast } = useErrorToast();
  const handleError = (error: Error) => showErrorToast(error.message);

  const { cartItems, increaseQuantity, decreaseQuantity } = useCartItemQuantityControl({
    productId,
    onError: handleError,
  });

  const targetCartItem = cartItems.find(({ product }) => product.id === productId);

  return (
    <S.Container>
      {targetCartItem ? (
        <CartItemCounter
          count={targetCartItem.quantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      ) : (
        <CartItemAddButton addCartItem={increaseQuantity} />
      )}
    </S.Container>
  );
};

export default CartItemQuantityController;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-top: 0.8rem;
    width: 100%;
    right: 0;
  `,
};
