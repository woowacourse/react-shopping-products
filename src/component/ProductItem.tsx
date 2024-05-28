import styled from "styled-components";

const MOCK_IMAGE_URL = "https://via.placeholder.com/160";

const ProductItem = () => {
  return (
    <S.Container>
      <S.ProductImage src={MOCK_IMAGE_URL}></S.ProductImage>
      <S.ProductInfo>
        <S.ProductName>상품이름</S.ProductName>
        <S.ProductDescription>멋진 상품</S.ProductDescription>
        <S.ProductPrice>3500000원</S.ProductPrice>
      </S.ProductInfo>
    </S.Container>
  );
};

export default ProductItem;

const S = {
  Container: styled.article`
    display: flex;
    flex-direction: column;
    flex: 1 0 50%;
    box-sizing: border-box;
    padding: 10px;
  `,
  ProductImage: styled.img``,
  ProductInfo: styled.div``,
  ProductName: styled.h3`
    font-weight: bold;
  `,
  ProductDescription: styled.p``,
  ProductPrice: styled.p``,
};
