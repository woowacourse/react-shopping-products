import CartItemButton from "./components/CartItemButton/CartItemButton";
import * as S from "./ProductItem.styles";

interface ProductItemProps {
  imageUrl: string;
  name: string;
  price: number;
}

const ProductItem = ({ imageUrl, name, price }: ProductItemProps) => {
  return (
    <S.ProductContainer>
      <S.ProductImage $url={imageUrl} />
      <S.ProductWrapper>
        <S.ProductName>{name}</S.ProductName>
        <S.ProductPrice>{price}</S.ProductPrice>
        <CartItemButton isAdd={false} />
      </S.ProductWrapper>
    </S.ProductContainer>
  );
};

export default ProductItem;
