import styled from "@emotion/styled";
import QuantityController from "../QuantityController/QuantityController";
import AddToCartButton from "./components/CartItemButton/AddToCartButton/AddToCartButton";
import * as S from "./ProductItem.styles";

interface ProductItemProps {
  imageUrl: string;
  name: string;
  price: number;
  id: number;
  quantity: number;
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
  quantity,
  cartItemInfo,
  onAddToCart,
  onQuantityIncrease,
  onQuantityDecrease,
}: ProductItemProps) => {
  const currentCartItem = cartItemInfo.find((item) => item.productId === id);
  const isInCart = !!currentCartItem;
  const cartQuantity = currentCartItem?.quantity || 0;
  return (
    <S.ProductContainer data-testid="product-item">
      <ProductImageContainer>
        <S.ProductImage src={imageUrl} />
        {quantity === 0 && <OutOfStockOverlay>품절</OutOfStockOverlay>}
      </ProductImageContainer>

      <S.ProductWrapper>
        <S.ProductName data-testid="product-name">{name}</S.ProductName>
        <S.ProductPrice data-testid="product-price">
          {price.toLocaleString()}원
        </S.ProductPrice>
        {isInCart ? (
          <QuantityControllerWrapper>
            <QuantityController
              stockQuantity={quantity}
              cartQuantity={cartQuantity}
              onIncrease={() => onQuantityIncrease(id)}
              onDecrease={() => onQuantityDecrease(id)}
            />
          </QuantityControllerWrapper>
        ) : (
          <AddToCartButton
            onAdd={() => onAddToCart(id)}
            disabled={quantity === 0}
          />
        )}
      </S.ProductWrapper>
    </S.ProductContainer>
  );
};

export default ProductItem;

export const ProductImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50%;
  border-radius: 8px 8px 0 0;
  border: 1px solid #0000001a;
`;

export const OutOfStockOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px 8px 0 0;
`;

export const QuantityControllerWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 12px;
  bottom: 12px;
`;
