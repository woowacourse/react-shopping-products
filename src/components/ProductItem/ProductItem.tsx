import AddToCartButton from "./components/CartItemButton/AddToCartButton/AddToCartButton";
import RemoveFromCartButton from "./components/CartItemButton/RemoveFromCartButton/RemoveFromCartButton";
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
        {isAdd ? (
          <RemoveFromCartButton onRemove={handleCartItemToggle} />
        ) : (
          <AddToCartButton onAdd={handleCartItemToggle} />
        )}
      </S.ProductWrapper>
    </S.ProductContainer>
  );
};

export default ProductItem;
