import CartItemButton from "./components/CartItemButton/CartItemButton";
import * as S from "./ProductItem.styles";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  isAdded: boolean;
  handleCartItemToggle: () => void;
}

const ProductItem = ({
  imageUrl,
  name,
  price,
  isAdded,
  handleCartItemToggle,
}: Props) => {
  return (
    <S.ProductContainer data-testid="product-item">
      <S.ProductImage $url={imageUrl} />
      <S.ProductWrapper>
        <S.ProductName data-testid="product-name">{name}</S.ProductName>
        <S.ProductPrice data-testid="product-price">{price}</S.ProductPrice>
        <CartItemButton
          isAdded={isAdded}
          onToggleCartItem={handleCartItemToggle}
        />
      </S.ProductWrapper>
    </S.ProductContainer>
  );
};

export default ProductItem;
