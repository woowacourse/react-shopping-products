import styled from '@emotion/styled';
import AddCartButton from './AddCartButton';
import DeleteCartButton from './DeleteCartButton';
import { useCartContext } from '@/context/useCartContext';
import { useShopErrorContext } from '@/shop/context/useShopErrorContext';
import { addCartItem } from '../api/addCartItem';
import { deleteCartItem } from '../api/deleteCartItem';
import { Flex } from '@/components/common';

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
  const { cartCount, refetch } = useCartContext();
  const { showErrorMessage, hideErrorMessage } = useShopErrorContext();

  const handleAddCart = async () => {
    try {
      if (cartCount >= 50) {
        showErrorMessage('장바구니는 최대 50개까지 담을 수 있습니다.');
        return;
      }
      await addCartItem(id);
      refetch();
      hideErrorMessage();
    } catch {
      showErrorMessage('장바구니에 담는 데 실패했습니다.');
    }
  };

  const handleDeleteCart = async () => {
    try {
      if (!cartId) return;

      await deleteCartItem(cartId);
      refetch();
      hideErrorMessage();
    } catch {
      showErrorMessage('장바구니에서 삭제하는 데 실패했습니다.');
    }
  };

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
