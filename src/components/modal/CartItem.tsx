import { Product } from "../../types/response.types";
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
}

function CartItem({ product, quantity }: CartItemProps) {
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
              <button css={CountControlButton}>-</button>
              <p>{quantity}</p>
              <button css={CountControlButton}>+</button>
            </div>
          </div>
        </div>
        <button css={DeleteButton}>삭제</button>
      </div>
      <hr />
    </>
  );
}
export default CartItem;
