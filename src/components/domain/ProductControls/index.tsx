import useCartItemQuantity from "../../../hooks/useCartItemQuantity";
import { CartItemType } from "../../../types/cartItems";
import S from "./styledComponent";

const ProductControls = ({ cartItem }: { cartItem: CartItemType }) => {
  const { increaseQuantity, decreaseQuantity } = useCartItemQuantity();

  if (!cartItem) return null;

  return (
    <S.ProductControls>
      <S.Button
        onClick={() => {
          decreaseQuantity(cartItem.id);
        }}
      >
        -
      </S.Button>
      <S.Quantity>{cartItem.quantity}</S.Quantity>
      <S.Button
        onClick={() => {
          increaseQuantity(cartItem.id);
        }}
      >
        +
      </S.Button>
    </S.ProductControls>
  );
};

export default ProductControls;
