import { Flex } from '@/components/common';
import { useCartContext } from '@/context/useCartContext';
import { useShopErrorContext } from '@/shop/context/useShopErrorContext';
import styled from '@emotion/styled';
import { addCartItem } from '../api/addCartItem';
import { deleteCartItem } from '../api/deleteCartItem';
import { updateCartItem } from '../api/updateCartItem';
import AddCartButton from './AddCartButton';

interface ProductProps {
  id: string;
  cartId: string | null;
  cartCount: number | null;
  name: string;
  price: number;
  imageUrl: string;
  isInCart: boolean;
}

function ProductRowCard({
  id,
  cartId,
  cartCount,
  name,
  price,
  imageUrl,
  isInCart,
}: ProductProps) {
  const { cartCount: totalCartCount, refetch } = useCartContext();
  const { showErrorMessage, hideErrorMessage } = useShopErrorContext();

  const handleAddCart = async () => {
    try {
      if (totalCartCount >= 50) {
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

  const handleUpdateCart = async (quantity: number) => {
    try {
      if (!cartId) return;

      await updateCartItem(cartId, quantity);
      refetch();
      hideErrorMessage();
    } catch (error) {
      if (error instanceof Error) {
        showErrorMessage(error.message);
      } else {
        showErrorMessage('장바구니 수량 변경에 실패했습니다.');
      }
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
          <UpdateCartBox>
            {cartCount === 1 ? (
              <Button onClick={handleDeleteCart}>
                <img src="./assets/icons/DeleteCart.svg" width={12} />
              </Button>
            ) : (
              <Button onClick={() => handleUpdateCart((cartCount ?? 1) - 1)}>
                <img src="./assets/icons/Minus.svg" />
              </Button>
            )}
            <Text>{cartCount}</Text>
            <Button onClick={() => handleUpdateCart((cartCount ?? 1) + 1)}>
              <img src="./assets/icons/Plus.svg" />
            </Button>
          </UpdateCartBox>
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

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;

  border: 1px solid #0000001a;
  border-radius: 8px;
`;

export default ProductRowCard;
