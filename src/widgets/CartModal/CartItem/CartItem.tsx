import QuantitySelector from "../../../shared/ui/QuantitySelector/QuantitySelector";
import * as S from "./CartItem.styles";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  increaseItemQuantity: () => void;
  decreaseItemQuantity: () => void;
  deleteProductInCart: () => void;
  increaseDisabled?: boolean;
  decreaseDisabled?: boolean;
}

const CartItem = ({
  imageUrl,
  name,
  price,
  quantity,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteProductInCart,
  increaseDisabled,
  decreaseDisabled,
}: Props) => {
  return (
    <S.CartItem>
      <S.CartItemImage $url={imageUrl} />
      <S.CartItemWrapper>
        <S.CartItemInfo>
          <S.CartItemName>{name}</S.CartItemName>
          <S.CartItemPrice>{price.toLocaleString()}원</S.CartItemPrice>
          <QuantitySelector
            quantity={quantity}
            onIncrease={increaseItemQuantity}
            onDecrease={decreaseItemQuantity}
            increaseDisabled={increaseDisabled}
            decreaseDisabled={decreaseDisabled}
          />
        </S.CartItemInfo>
        <S.DeleteButton onClick={deleteProductInCart}>삭제</S.DeleteButton>
      </S.CartItemWrapper>
    </S.CartItem>
  );
};

export default CartItem;
