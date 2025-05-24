import QuantitySelector from "../@common/QuantitySelector/QuantitySelector";
import AddCartItemButton from "./components/AddCartItemButton/AddCartItemButton";
import * as S from "./ProductItem.styles";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  currentQuantity: number;
  maxQuantity: number;
  increaseItemQuantity: () => void;
  decreaseItemQuantity: () => void;
  addProductInCart: () => void;
}

const CART_QUANTITY_THRESHOLD = 1;

const ProductItem = ({
  imageUrl,
  name,
  price,
  currentQuantity,
  maxQuantity,
  increaseItemQuantity,
  decreaseItemQuantity,
  addProductInCart,
}: Props) => {
  const isMaxQuantityReached = currentQuantity >= maxQuantity;
  const isInCart = currentQuantity >= CART_QUANTITY_THRESHOLD;

  return (
    <S.ProductContainer>
      <S.ProductImage $url={imageUrl} />
      <S.ProductWrapper>
        <S.ProductName>{name}</S.ProductName>
        <S.ProductPrice>{price.toLocaleString()}원</S.ProductPrice>
        <S.QuantityWrapper>
          {isInCart ? (
            <QuantitySelector
              quantity={currentQuantity}
              onIncrease={increaseItemQuantity}
              onDecrease={decreaseItemQuantity}
              increaseDisabled={isMaxQuantityReached}
            />
          ) : (
            <AddCartItemButton onAdd={addProductInCart} />
          )}
        </S.QuantityWrapper>
      </S.ProductWrapper>
    </S.ProductContainer>
  );
};

export default ProductItem;
