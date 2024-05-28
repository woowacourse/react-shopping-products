import styled from "@emotion/styled";
import { PropsWithChildren } from "react";
import ToggleItemButton from "./ToggleItemButton";

const S = {
  ProductCard: styled.div`
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 182px;
    font-family: Arial, sans-serif;
    overflow: hidden;
  `,
  ProductImage: styled.img`
    width: 100%;
    height: 112px;
    object-fit: cover;
  `,
  ProductInfo: styled.div`
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  ProductName: styled.div`
    font-size: 14px;
    font-weight: 700;
  `,
  ProductDescription: styled.div`
    font-size: 12px;
    font-weight: 500;
    color: #666;
  `,
  Price: styled.div`
    font-size: 12px;
    font-weight: 500;
  `,
};

interface ProductCardProps extends PropsWithChildren {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    description?: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <S.ProductCard>
      <S.ProductImage src={product.imageUrl} alt={product.name} />
      <S.ProductInfo>
        <S.ProductName>{product.name}</S.ProductName>
        <S.ProductDescription>{product.description}</S.ProductDescription>
        <S.Price>{`${product.price.toLocaleString()}원`}</S.Price>
        <ToggleItemButton id={product.id} />
      </S.ProductInfo>
    </S.ProductCard>
  );
};

export default ProductCard;
