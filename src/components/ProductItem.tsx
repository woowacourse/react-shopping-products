import styled from "styled-components";

interface ProductItemProps {
  name: string;
  price: number;
  imageUrl: string;
}

const ProductItem = ({ name, price, imageUrl }: ProductItemProps) => {
  return (
    <S.Container>
      <S.ProductImage src={imageUrl}></S.ProductImage>
      <S.ProductInfo>
        <S.ProductName>{name}</S.ProductName>
        <S.ProductPrice>{price.toLocaleString()}원</S.ProductPrice>
      </S.ProductInfo>
    </S.Container>
  );
};

export default ProductItem;

const S = {
  Container: styled.article`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 48%;
  `,

  ProductImage: styled.img`
    width: 100%;
    height: 11rem;
    object-fit: cover;
    border-radius: 1.2rem 1.2rem 0 0;
  `,

  ProductInfo: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 1.5rem 0.8rem;
  `,
  ProductName: styled.h3`
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 0.8rem;
  `,
  ProductPrice: styled.p`
    font-size: 1.2rem;
  `,
};
