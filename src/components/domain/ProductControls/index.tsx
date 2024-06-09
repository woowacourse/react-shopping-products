import useCartItemQuantity from "../../../hooks/useCartItemQuantity";
import { ICartItem } from "../../../types/cartItems";
import S from "./styledComponent";
import LoadingDots from "../../common/LoadingDots";

const ProductControls = ({ cartItem }: { cartItem: ICartItem }) => {
  const { increaseQuantity, decreaseQuantity, deleteItemMutation } = useCartItemQuantity();

  if (!cartItem) return null;

  if (!deleteItemMutation.isIdle) {
    return <LoadingDots />;
  }

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
