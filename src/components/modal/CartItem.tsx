import { useCartItemActions } from "../../hooks/useCartItemActions";
import { useError } from "../../hooks/useError";
import { Product } from "../../types/response.types";
import ControlButton from "../controlButton/ControlButton";

import {
  DeleteButton,
  ItemContainer,
  ItemContent,
  ItemInfo,
  ItemPrice,
  ItemTitle,
  ProductImage,
} from "./CartItem.css";

interface CartItemProps {
  product: Product;
  quantity: number;
  cartId: number;
  productId: number;
  productQuantity: number;
  fetchCartProducts: () => void;
  setCartItemIds: React.Dispatch<
    React.SetStateAction<Record<"quantity" | "cartId" | "productId", number>[]>
  >;
}

function CartItem({
  product,
  quantity,
  cartId,
  productQuantity,
  fetchCartProducts,
  productId,
  setCartItemIds,
}: CartItemProps) {
  const { setErrorTrue } = useError();
  const { handlePlus, handleMinus, handleRemove } = useCartItemActions({
    cartId,
    productId,
    productQuantity,
    quantity,
    setErrorTrue,
    fetchCartProducts,
    setCartItemIds,
  });
  return (
    <>
      <div css={ItemContainer}>
        <div css={ItemInfo}>
          <img css={ProductImage} src={product.imageUrl}></img>
          <div css={ItemContent}>
            <h3 css={ItemTitle}>{product.name}</h3>
            <p css={ItemPrice}>
              {(product.price * quantity).toLocaleString()}원
            </p>
            <ControlButton
              handleMinus={handleMinus}
              handlePlus={handlePlus}
              quantity={quantity}
            />
          </div>
        </div>
        <button css={DeleteButton} onClick={handleRemove}>
          삭제
        </button>
      </div>
      <hr />
    </>
  );
}
export default CartItem;
