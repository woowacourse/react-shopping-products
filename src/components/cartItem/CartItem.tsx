import { Product } from "../../types/response.types";
import CartManageButton from "../cartManageButton/CartManageButton";
import useCartToggleButton from "../cartToggleButton/useCartToggleButton";
import {
  CountContainer,
  DeleteButton,
  ItemContainer,
  ItemContent,
  ItemInfo,
  ItemPrice,
  ItemTitle,
  ProductImage,
} from "./CartItem.css";

interface CartItemProps {
  id: number;
  product: Product;
}

function CartItem({ id, product }: CartItemProps) {
  const { removeItemToCart } = useCartToggleButton();

  return (
    <>
      <div css={ItemContainer}>
        <div css={ItemInfo}>
          <img css={ProductImage} src={product.imageUrl}></img>
          <div css={ItemContent}>
            <h3 css={ItemTitle}>{product.name}</h3>
            <p css={ItemPrice}>{product.price.toLocaleString()}원</p>
            <div css={CountContainer}>
              <CartManageButton quantity={product.quantity} cartId={id} />
            </div>
          </div>
        </div>
        <button
          onClick={() => removeItemToCart({ cartId: id })}
          css={DeleteButton}
        >
          삭제
        </button>
      </div>
      <hr />
    </>
  );
}
export default CartItem;
