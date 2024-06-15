import CartActionButton from "@/components/QuantityButton/CartActionButton";
import QuantityUpdateButton from "@/components/QuantityButton/QuantityUpdateButton";
import { useCartItemsQuery } from "@/hooks/server/useCartItems";
import { convertProductIdToCartId, getQuantityInCart } from "@/utils/cart";
import { memo } from "react";

const QuantityButton = ({ id }: { id: number }) => {
  const { data: cartItems } = useCartItemsQuery();

  const quantity = getQuantityInCart(cartItems || [], id);
  const cartId = convertProductIdToCartId(cartItems || [], id);

  return (
    <>
      {quantity > 0 && cartId ? (
        <QuantityUpdateButton quantity={quantity} cartId={cartId} />
      ) : (
        <CartActionButton productId={id} />
      )}
    </>
  );
};

const QuantityButtonMemo = memo(QuantityButton);

export default QuantityButtonMemo;
