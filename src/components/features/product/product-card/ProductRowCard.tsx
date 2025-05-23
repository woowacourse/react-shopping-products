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

function ProductRowCard({
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

export default ProductRowCard;
