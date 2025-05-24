import { Flex } from '@/components/common';
import {
  addCartItem,
  deleteCartItem,
  updateCartItem,
} from '@/components/features/cart/api';
import { useCartContext } from '@/components/features/cart/context';
import { useShopErrorContext } from '@/pages/shop/context/useShopErrorContext';
import styled from '@emotion/styled';
import AddCartButton from './AddCartButton';

interface ProductProps {
  id: string;
  cartId: string | null;
  cartCount: number | null;
  name: string;
  price: number;
  imageUrl: string;
  isInCart: boolean;
  quantity: number;
}

function ProductCard({
  id,
  cartId,
  cartCount,
  name,
  price,
  imageUrl,
  isInCart,
  quantity,
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
        {quantity === 0 && (
          <SoldOutOverlay>
            <SoldOutText>품절</SoldOutText>
          </SoldOutOverlay>
        )}
      </PreviewBox>
      <InfoBox>
        <Flex flexDirection="column" gap="sm" alignItems="flex-start">
          <ProductTitle>{name}</ProductTitle>
          <ProductPrice>{`${price.toLocaleString()}원`}</ProductPrice>
        </Flex>
        {quantity !== 0 &&
          (isInCart ? (
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
          ))}
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
  position: relative;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SoldOutOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 112px;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검정 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SoldOutText = styled.p`
  color: white;
  font-size: 20px;
  font-weight: bold;
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

export default ProductCard;
