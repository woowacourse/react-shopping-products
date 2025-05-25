import styled from '@emotion/styled';
import { Flex } from '../../../../common';
import ToggleCartButton from './cart-button/ToggleCartButton';
import ProductPreviewImage from '../../../../common/ProductPreviewImage';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

function ProductCard({ id, name, price, imageUrl, quantity }: ProductProps) {
  const isSoldOut = quantity === 0;
  return (
    <Container data-testid={`product-${id}`}>
      <PreviewBox>
        <ProductPreviewImage imageSource={imageUrl} isSoldOut={isSoldOut} />
        {isSoldOut && <PreviewText>품절</PreviewText>}
      </PreviewBox>
      <InfoBox>
        <Flex
          flexDirection="column"
          gap="sm"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <ProductTitle>{name}</ProductTitle>
          <ProductPrice>{`${price.toLocaleString()}원`}</ProductPrice>
        </Flex>
        {!isSoldOut && <ToggleCartButton productId={id} />}
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
  height: 112px;
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

const InfoBox = styled(Flex)`
  padding: 12px;
  align-items: flex-end;
`;

const ProductTitle = styled.p`
  ${({ theme }) => theme.title};
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductPrice = styled.p`
  ${({ theme }) => theme.body2};
`;

export default ProductCard;
