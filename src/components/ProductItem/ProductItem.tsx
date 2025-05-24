import QuantityController from "../QuantityController/QuantityController";
import AddToCartButton from "./components/CartItemButton/AddToCartButton/AddToCartButton";
import * as S from "./ProductItem.styles";

interface ProductItemProps {
  imageUrl: string;
  name: string;
  price: number;
  id: number;
  cartItemInfo: Array<{ cartId: number; productId: number; quantity: number }>;
  onAddToCart: (productId: number) => void;
  onQuantityIncrease: (productId: number) => void;
  onQuantityDecrease: (productId: number) => void;
}

const ProductItem = ({
  imageUrl,
  name,
  price,
  id,
  cartItemInfo,
  onAddToCart,
  onQuantityIncrease,
  onQuantityDecrease,
}: ProductItemProps) => {
  const currentCartItem = cartItemInfo.find((item) => item.productId === id);
  const isInCart = !!currentCartItem;
  const quantity = currentCartItem?.quantity || 0;

  return (
    <S.ProductContainer data-testid="product-item">
      <S.ProductImage $url={imageUrl} />
      <S.ProductWrapper>
        <S.ProductName data-testid="product-name">{name}</S.ProductName>
        <S.ProductPrice data-testid="product-price">
          {price.toLocaleString()}원
        </S.ProductPrice>
        {isInCart ? (
          <QuantityController
            quantity={quantity}
            onIncrease={() => onQuantityIncrease(id)}
            onDecrease={() => onQuantityDecrease(id)}
          />
        ) : (
          <AddToCartButton onAdd={() => onAddToCart(id)} />
        )}
      </S.ProductWrapper>
    </S.ProductContainer>
  );
};

export default ProductItem;
