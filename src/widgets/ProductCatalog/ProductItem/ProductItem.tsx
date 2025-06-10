import { Product } from "../../../apis/types/response";
import { useCart } from "../../../features/cart/hooks/useCart";
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
}: Product) => {
  const { product } = useCart();

  const currentQuantity = product.quantity.get(id);
  const outOfStock = maxQuantity <= 0;
  const reachedMaxQuantity = currentQuantity >= maxQuantity;
  const existsInCart = currentQuantity >= CART_QUANTITY_THRESHOLD;

  return (
    <S.ProductContainer>
      <S.ProductImage $url={imageUrl}>
        {outOfStock && <S.SoldOutOverlay>SOLD OUT</S.SoldOutOverlay>}
      </S.ProductImage>
      <S.ProductWrapper>
        <S.ProductName>{name}</S.ProductName>
        <S.ProductPrice>{price.toLocaleString()}원</S.ProductPrice>
        <S.QuantityWrapper>
          {existsInCart ? (
            <QuantitySelector
              quantity={currentQuantity}
              onIncrease={() => product.quantity.increase(id)}
              onDecrease={() => product.quantity.decrease(id)}
              increaseDisabled={reachedMaxQuantity}
            />
          ) : (
            <AddCartItemButton
              onClick={() => product.add(id)}
              disabled={reachedMaxQuantity}
            />
          )}
        </S.QuantityWrapper>
      </S.ProductWrapper>
    </S.ProductContainer>
  );
};

export default ProductItem;
