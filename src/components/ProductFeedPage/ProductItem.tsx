import styled from "styled-components";
import CartItemQuantityController from "@components/ProductFeedPage/CartItemQuantityController";
import { formatToKRW } from "@utils/formatToKRW";
import ImageWithFallback from "../common/ImageWithFallback";
import { Product } from "@src/apis/products";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { id, name, price, imageUrl } = product;

  return (
    <S.Container>
      <S.ProductImage src={imageUrl}></S.ProductImage>
      <S.ProductInfo>
        <S.ProductName>{name}</S.ProductName>
        <S.ProductPrice>{formatToKRW(price)}</S.ProductPrice>
      </S.ProductInfo>
      <CartItemQuantityController productId={id} />
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

  ProductImage: styled(ImageWithFallback)`
    width: 100%;
    height: 11rem;
    object-fit: cover;
    border-radius: 1.2rem 1.2rem 0 0;

    // 이미지 드래그 방지
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
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
