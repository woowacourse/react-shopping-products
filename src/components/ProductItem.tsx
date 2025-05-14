import styled from '@emotion/styled';
import Button from './Button';
import { ProductItemType } from '../types/data';

interface ProductItemProps {
  product: ProductItemType;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <ProductItemContainer>
      <ProductItemImage src={product.imageUrl} />
      <ProductItemCard>
        <ProductItemInfo>
          <ProductItemTitle>{product.name}</ProductItemTitle>
          <ProductItemPrice>{product.price}</ProductItemPrice>
        </ProductItemInfo>
        <Button type="button" id="add" content="담기" name="담기" variant="smallBlack" />
      </ProductItemCard>
    </ProductItemContainer>
  );
};

const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 182px;
  width: 100%;
  gap: 8px;
  border-radius: 8px;
  background-color: var(--color-white);
`;

const ProductItemImage = styled.img`
  height: 50%;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const ProductItemCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 27px;
  margin: 8px;
  align-items: end;
`;

const ProductItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 6px;
  width: 100%;
`;

const ProductItemTitle = styled.span`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
  width: 100%;
  text-align: start;
`;

const ProductItemPrice = styled.span`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
  width: 100%;
`;

export default ProductItem;
