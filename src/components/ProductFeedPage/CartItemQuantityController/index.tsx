import { useErrorToast } from "@src/contexts/errorToast/useErrorToast";
import CartItemAddButton from "./CartItemAddButton";
import { useCartItemQuantityControl } from "@serverState/hooks/useCartItemQuantityControl";
import styled from "styled-components";
import Counter from "@src/components/common/Counter";

interface CartItemQuantityControllerProps {
  productId: number;
}

const MIN_CART_ITEM_COUNT = 0;
//  NOTE(@ryan) - 명확한 정책이 없어서 임시로 99개로 설정
const MAX_CART_ITEM_COUNT = 99;

const CartItemQuantityController = ({ productId }: CartItemQuantityControllerProps) => {
  const { showErrorToast } = useErrorToast();

  const { cartItems, increaseQuantity, decreaseQuantity } = useCartItemQuantityControl({
    productId,
    onError: showErrorToast,
  });

  const targetCartItem = cartItems.find(({ product }) => product.id === productId);

  return (
    <S.Container>
      {targetCartItem ? (
        <Counter
          count={targetCartItem.quantity}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          minCount={MIN_CART_ITEM_COUNT}
          maxCount={MAX_CART_ITEM_COUNT}
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
