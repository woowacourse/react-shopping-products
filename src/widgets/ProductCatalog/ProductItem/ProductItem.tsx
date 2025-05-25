import { useCartItems } from "../../../entities/cartItem/useCartItems";
import { BaseProduct } from "../../../shared/api/types/response";
import QuantitySelector from "../../../shared/ui/QuantitySelector/QuantitySelector";
import AddCartItemButton from "./AddCartItemButton/AddCartItemButton";
import * as S from "./ProductItem.styles";

const CART_QUANTITY_THRESHOLD = 1;

const ProductItem = ({
  id,
  name,
  price,
  imageUrl,
  quantity: maxQuantity,
}: BaseProduct) => {
  const {
    quantityByProductId,
    increaseItemQuantity,
    decreaseItemQuantity,
    addProductInCart,
  } = useCartItems();

  const currentQuantity = quantityByProductId(id);
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
              onIncrease={() => increaseItemQuantity(id)}
              onDecrease={() => decreaseItemQuantity(id)}
              increaseDisabled={isMaxQuantityReached}
            />
          ) : (
            <AddCartItemButton
              onClick={() => addProductInCart(id)}
              disabled={isMaxQuantityReached}
            />
          )}
        </S.QuantityWrapper>
      </S.ProductWrapper>
    </S.ProductContainer>
  );
};

export default ProductItem;
