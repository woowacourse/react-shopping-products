import CartManageButton from "../cartAddButton/CartManageButton";
import { ButtonContainer } from "./CartToggleButton.css";
import useCartToggleButton from "./useCartToggleButton";
import useCartQuantity from "../../hooks/useCartQuantity/useCartQuantity";

interface CartToggleButtonProps {
  isSoldOut: boolean;
  quantity: number;
  isAdded: boolean;
  productId: number;
  cartId?: number;
  cartAmount: number;
  setCartItemIds: React.Dispatch<
    React.SetStateAction<Record<"productId" | "cartId", number>[]>
  >;
  fetchCartProducts: () => void;
}

function CartToggleButton({
  isSoldOut,
  quantity,
  productId,
  cartId,
  cartAmount,
  isAdded,
  setCartItemIds,
  fetchCartProducts,
}: CartToggleButtonProps) {
  const { removeItemToCart, addItemToCart } = useCartToggleButton({
    setCartItemIds,
    fetchCartProducts,
  });

  const { cartQuantity, increase, decrease } = useCartQuantity({
    cartId,
    productId,
    quantity,
    removeItemToCart,
  });

  return isAdded ? (
    <CartManageButton
      quantity={cartQuantity}
      increase={increase}
      decrease={decrease}
    />
  ) : (
    <button
      css={ButtonContainer}
      onClick={() =>
        addItemToCart({
          productId,
          cartAmount,
        })
      }
      disabled={isSoldOut}
    >
      <img src={"addCart.svg"} alt={`담기 아이콘`} />
      <p>{"담기"}</p>
    </button>
  );
}

export default CartToggleButton;
