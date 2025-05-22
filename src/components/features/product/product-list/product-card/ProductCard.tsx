import styled from '@emotion/styled';
import { Flex } from '../../../../common';
import ToggleCartButton from './cart-button/ToggleCartButton';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

function ProductCard({ id, name, price, imageUrl }: ProductProps) {
  return (
    <Container data-testid={`product-${id}`}>
      <PreviewBox>
        <PreviewImage src={imageUrl} />
      </PreviewBox>
      <InfoBox>
        <Flex flexDirection="column" gap="sm" alignItems="flex-start">
          <ProductTitle>{name}</ProductTitle>
          <ProductPrice>{`${price.toLocaleString()}원`}</ProductPrice>
        </Flex>
        <ToggleCartButton productId={id} />
      </InfoBox>
    </Container>
  );
}

const Container = styled(Flex)`
  width: 182px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`;

const PreviewBox = styled.div`
  width: 100%;
  height: 112px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
