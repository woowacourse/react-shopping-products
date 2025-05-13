import CartItemButton from "./components/CartItemButton/CartItemButton";
import * as S from "./ProductItem.styles";

const ProductItem = () => {
  return (
    <S.ProductContainer>
      <S.ProductImage $url="https://content.surfit.io/thumbs/image/3N4Pw/0A4L9/116325713668224bd83dd1f.png/cover-center-2x.webp" />
      <S.ProductWrapper>
        <S.ProductName>이름</S.ProductName>
        <S.ProductPrice>가격</S.ProductPrice>
        <CartItemButton isAdd={false} />
      </S.ProductWrapper>
    </S.ProductContainer>
  );
};

export default ProductItem;
