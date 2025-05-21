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
    <S.ProductContainer>
      <S.ProductImage $url={imageUrl} />
      <S.ProductWrapper>
        <S.ProductName>{name}</S.ProductName>
        <S.ProductPrice>{price}</S.ProductPrice>
        <CartItemButton
          isAdded={isAdded}
          onToggleCartItem={handleCartItemToggle}
        />
      </S.ProductWrapper>
    </S.ProductContainer>
  );
};

export default ProductItem;
