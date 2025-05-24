import QuantitySelector from "../../../shared/ui/QuantitySelector/QuantitySelector";
import AddCartItemButton from "./AddCartItemButton/AddCartItemButton";
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
  const isOutOfStock = maxQuantity <= 0;
  const isMaxQuantityReached = currentQuantity >= maxQuantity;
  const isInCart = currentQuantity >= CART_QUANTITY_THRESHOLD;

  return (
    <S.ProductContainer>
      <S.ProductImage $url={imageUrl}>
        {isOutOfStock && <S.SoldOutOverlay>SOLD OUT</S.SoldOutOverlay>}
      </S.ProductImage>
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
            <AddCartItemButton
              onClick={addProductInCart}
              disabled={isMaxQuantityReached}
            />
          )}
        </S.QuantityWrapper>
      </S.ProductWrapper>
    </S.ProductContainer>
  );
};

export default ProductItem;
