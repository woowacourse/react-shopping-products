import CartItemButton from "./components/CartItemButton/CartItemButton";
import * as S from "./ProductItem.styles";

interface ProductItemProps {
  imageUrl: string;
  name: string;
  price: number;
  isAdd: boolean;
  handleCartItemToggle: () => void;
}

const ProductItem = ({
  imageUrl,
  name,
  price,
  isAdd,
  handleCartItemToggle,
}: ProductItemProps) => {
  return (
    <S.ProductContainer data-testid="product-item">
      <S.ProductImage $url={imageUrl} />
      <S.ProductWrapper>
        <S.ProductName data-testid="product-name">{name}</S.ProductName>
        <S.ProductPrice data-testid="product-price">{price}</S.ProductPrice>
        <CartItemButton isAdd={isAdd} onToggleCartItem={handleCartItemToggle} />
      </S.ProductWrapper>
    </S.ProductContainer>
  );
};

export default ProductItem;
