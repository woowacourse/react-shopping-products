import QuantitySelector from "../@common/QuantitySelector/QuantitySelector";
import AddCartItemButton from "./components/AddCartItemButton/AddCartItemButton";
import * as S from "./ProductItem.styles";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  increaseItemQuantity: () => void;
  decreaseItemQuantity: () => void;
  addProductInCart: () => void;
}

const CART_QUANTITY_THRESHOLD = 1;

const ProductItem = ({
  imageUrl,
  name,
  price,
  quantity,
  increaseItemQuantity,
  decreaseItemQuantity,
  addProductInCart,
}: Props) => {
  return (
    <S.ProductContainer>
      <S.ProductImage $url={imageUrl} />
      <S.ProductWrapper>
        <S.ProductName>{name}</S.ProductName>
        <S.ProductPrice>{price}</S.ProductPrice>
        {quantity >= CART_QUANTITY_THRESHOLD ? (
          <QuantitySelector
            quantity={quantity}
            onIncrease={increaseItemQuantity}
            onDecrease={decreaseItemQuantity}
          />
        ) : (
          <AddCartItemButton onAdd={addProductInCart} />
        )}
      </S.ProductWrapper>
    </S.ProductContainer>
  );
};

export default ProductItem;
