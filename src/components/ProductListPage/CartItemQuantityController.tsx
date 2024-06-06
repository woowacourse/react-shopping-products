import { useErrorToast } from "@src/contexts/errorToast/useErrorToast";
import CartItemCounter from "./CartItemCounter";
import CartItemAddButton from "./CartItemAddButton";
import { useCartItemQuantityControl } from "@src/server/useCartItemQuantityControl";

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
    <div>
      {targetCartItem ? (
        <CartItemCounter
          count={targetCartItem.quantity}
          increaseCartItemQuantity={increaseQuantity}
          decreaseCartItemQuantity={decreaseQuantity}
        />
      ) : (
        <CartItemAddButton addCartItem={increaseQuantity} />
      )}
    </div>
  );
};

export default CartItemQuantityController;
