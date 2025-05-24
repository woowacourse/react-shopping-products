import styled from '@emotion/styled';
import { Flex } from '../../../../common';
import ToggleCartButton from './cart-button/ToggleCartButton';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

function ProductCard({ id, name, price, imageUrl, quantity }: ProductProps) {
  const isSoldout = quantity === 0;
  return (
    <Container data-testid={`product-${id}`}>
      <PreviewBox>
        <PreviewImage src={imageUrl} isSoldout={isSoldout} />
        {isSoldout && <PreviewText>품절</PreviewText>}
      </PreviewBox>
      <InfoBox>
        <Flex flexDirection="column" gap="sm" alignItems="flex-start">
          <ProductTitle>{name}</ProductTitle>
          <ProductPrice>{`${price.toLocaleString()}원`}</ProductPrice>
        </Flex>
        {!isSoldout && <ToggleCartButton productId={id} />}
      </InfoBox>
    </Container>
  );
}

const Container = styled(Flex)`
  width: 182px;
  height: 224px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.14);
`;

const PreviewBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 112px;
`;

const PreviewText = styled.p`
  position: absolute;
  color: white;
  ${({ theme }) => theme.heading};
`;

const PreviewImage = styled.img<{ isSoldout: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${({ isSoldout }) => isSoldout && `filter: grayscale(100%) brightness(0.5);`}
`;

const InfoBox = styled(Flex)`
  padding: 8px;
  gap: 24px;
  align-items: flex-end;
`;

const ProductTitle = styled.p`
  ${({ theme }) => theme.title};
`;

const ProductPrice = styled.p`
  ${({ theme }) => theme.body2};
`;

export default ProductCard;
