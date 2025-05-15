import styled from '@emotion/styled';
import Flex from '../../../common/Flex';
import AddCartButton from './AddCartButton';
import { baseAPI } from '../../../../api/baseAPI';
import DeleteCartButton from './DeleteCartButton';
import { useCartContext } from '../../../../context/useCartContext';
import { useShopErrorContext } from '../../../../pages/shop/context/useShopErrorContext';

interface ProductProps {
  id: string;
  cartId: string | null;
  name: string;
  price: number;
  imageUrl: string;
  isInCart: boolean;
}

function ProductCard({
  id,
  cartId,
  name,
  price,
  imageUrl,
  isInCart,
}: ProductProps) {
  const { refetch } = useCartContext();
  const { handleErrorTrue, handleErrorFalse } = useShopErrorContext();

  const handleAddCart = async () => {
    try {
      await baseAPI({
        method: 'POST',
        path: `/cart-items`,
        body: {
          productId: id,
          quantity: 1,
        },
      });
      refetch();
      handleErrorFalse();
    } catch (e) {
      handleErrorTrue();
    }
  };

  const handleDeleteCart = async () => {
    try {
      await baseAPI({
        method: 'DELETE',
        path: `/cart-items/${cartId}`,
      });
      refetch();
      handleErrorFalse();
    } catch (e) {
      handleErrorTrue();
    }
  };

  return (
    <Container>
      <PreviewBox>
        <PreviewImage src={imageUrl} />
      </PreviewBox>
      <InfoBox>
        <Flex flexDirection="column" gap="sm" alignItems="flex-start">
          <ProductTitle>{name}</ProductTitle>
          <ProductPrice>{`${price.toLocaleString()}원`}</ProductPrice>
        </Flex>
        {isInCart ? (
          <DeleteCartButton onClick={handleDeleteCart} />
        ) : (
          <AddCartButton onClick={handleAddCart} />
        )}
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
