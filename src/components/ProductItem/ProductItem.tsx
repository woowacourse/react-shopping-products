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
    <S.ProductContainer>
      <S.ProductImage $url={imageUrl} />
      <S.ProductWrapper>
        <S.ProductName>{name}</S.ProductName>
        <S.ProductPrice>{price}</S.ProductPrice>
        <CartItemButton isAdd={isAdd} onToggleCartItem={handleCartItemToggle} />
      </S.ProductWrapper>
    </S.ProductContainer>
  );
};

export default ProductItem;
