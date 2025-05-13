import styled from '@emotion/styled';
import Flex from '../../../common/Flex';
import AddCartButton from './AddCartButton';

function ProductCard() {
  return (
    <Container>
      <PreviewBox>
        <PreviewImage src="https://img.hankyung.com/photo/202208/99.30841131.1.jpg" />
      </PreviewBox>
      <InfoBox>
        <Flex flexDirection="column" gap="sm" alignItems="flex-start">
          <ProductTitle>상품 이름</ProductTitle>
          <ProductPrice>35,000원</ProductPrice>
        </Flex>
        <AddCartButton />
      </InfoBox>
    </Container>
  );
}

const Container = styled(Flex)`
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
