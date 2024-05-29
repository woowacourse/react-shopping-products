import * as S from "./ProductItemTitle.style";

interface ProductItemTitleProps {
  title: string;
  price: number;
}

const ProductItemTitle = ({ title, price }: ProductItemTitleProps) => {
  return (
    <S.ProductTitle>
      <S.ProductName>{title}</S.ProductName>
      <S.ProductPrice>{price}원</S.ProductPrice>
    </S.ProductTitle>
  );
};

export default ProductItemTitle;
