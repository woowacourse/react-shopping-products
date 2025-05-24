import { Flex } from '@/components/common';
import styled from '@emotion/styled';
import DeleteCartButton from './DeleteCartButton';
import UpdateCartButton from './UpdateCartButton';

interface ProductProps {
  id: string;
  cartId?: string;
  cartCount: number;
  name: string;
  price: number;
  imageUrl: string;
}

function ProductRowCard({
  id,
  cartId,
  cartCount,
  name,
  price,
  imageUrl,
}: ProductProps) {
  return (
    <Container data-testid={`product-${id}`}>
      <PreviewBox>
        <PreviewImage src={imageUrl} />
      </PreviewBox>
      <InfoBox>
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <CartProductInfo>
            <CartProductTitle>{name}</CartProductTitle>
            <CartProductPrice>{`${price.toLocaleString()}원`}</CartProductPrice>
          </CartProductInfo>
          <DeleteButton>
            <DeleteButtonText>삭제</DeleteButtonText>
          </DeleteButton>
        </Flex>
        <UpdateCartBox>
          {cartCount === 1 ? (
            <DeleteCartButton cartId={cartId} />
          ) : (
            <UpdateCartButton
              type="minus"
              cartId={cartId}
              cartCount={cartCount}
            />
          )}
          <Text>{cartCount}</Text>
          <UpdateCartButton type="plus" cartId={cartId} cartCount={cartCount} />
        </UpdateCartBox>
      </InfoBox>
    </Container>
  );
}

const Container = styled(Flex)`
  width: 100%;
  flex-direction: row;
  gap: 16px;
  background-color: white;
`;

const PreviewBox = styled.div`
  width: 80px;
  height: 80px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 8px;
  object-fit: cover;
`;

const InfoBox = styled(Flex)`
  padding: 8px;
  align-items: flex-start;
`;

const CartProductInfo = styled(Flex)`
  width: fit-content;
  align-items: flex-start;
  gap: 4px;
`;

const CartProductTitle = styled.p`
  font-weight: 700;
  font-size: 16px;
`;

const CartProductPrice = styled.p`
  ${({ theme }) => theme.body2};
`;

const DeleteButton = styled.button`
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #0000001a;
`;

const DeleteButtonText = styled.p`
  width: 100%;

  ${({ theme }) => theme.body2};
`;

const UpdateCartBox = styled(Flex)`
  width: fit-content;
  flex-direction: row;
  gap: 4px;
`;

const Text = styled.p`
  width: 24px;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  vertical-align: middle;
`;

export default ProductRowCard;
