import { ERROR_TYPE } from "../../hooks/useError";
import { Product } from "../../types/response.types";
import {
  MinusItem,
  PlusItem,
  removeItemToCart,
} from "../cartButton/cartButton.domain";
import {
  CountContainer,
  CountControlButton,
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
  setErrorTrue: (value: ERROR_TYPE) => void;
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
  setErrorTrue,
  fetchCartProducts,
  productId,
  setCartItemIds,
}: CartItemProps) {
  const handlePlusButton = async () => {
    try {
      await PlusItem({
        cartId,
        productQuantity,
        quantity,
        setErrorTrue,
        syncCartWithServer: fetchCartProducts,
      });
    } catch {
      console.log("추가 실패");
    }
  };

  const handleMinusButton = async () => {
    if (quantity === 1) {
      return handleRemove();
    }
    try {
      await MinusItem({
        cartId,
        quantity,
        syncCartWithServer: fetchCartProducts,
      });
    } catch {
      console.log("빼기 실패");
    }
  };
  const handleRemove = async () => {
    try {
      await removeItemToCart({
        cartId,
        productId,
        setCartItemIds,
        setErrorTrue,
      });
    } catch {
      console.log("삭제실패");
    }
  };
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
            <div css={CountContainer}>
              <button css={CountControlButton} onClick={handleMinusButton}>
                -
              </button>
              <p>{quantity}</p>
              <button css={CountControlButton} onClick={handlePlusButton}>
                +
              </button>
            </div>
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
