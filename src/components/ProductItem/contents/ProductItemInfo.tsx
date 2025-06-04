import styled from '@emotion/styled';
import { Product } from '../../../App';

type ProductItemInfoProps = {
  product: Product;
};

const ProductItemInfo = ({ product }: ProductItemInfoProps) => {
  return (
    <TextContainer>
      <ProductItemName>{product.name}</ProductItemName>
      <ProductItemPrice>{product.price.toLocaleString()}원</ProductItemPrice>
    </TextContainer>
  );
};

export default ProductItemInfo;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ProductItemName = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

const ProductItemPrice = styled.p`
  font-size: 16px;
`;
