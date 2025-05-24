import styled from '@emotion/styled';
import { updateCartItem, useCartContext } from '@/components/features/cart';
import { useShopErrorContext } from '@/pages/shop/context';

interface UpdateCartButtonProps {
  type: 'plus' | 'minus';
  cartId?: string;
  cartCount: number;
}

function UpdateCartButton({ type, cartId, cartCount }: UpdateCartButtonProps) {
  const { refetch } = useCartContext();
  const { showErrorMessage, hideErrorMessage } = useShopErrorContext();

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
    <Container
      onClick={() =>
        handleUpdateCart(type === 'plus' ? cartCount + 1 : cartCount - 1)
      }
    >
      {type === 'plus' ? (
        <img src="./assets/icons/Plus.svg" />
      ) : (
        <img src="./assets/icons/Minus.svg" />
      )}
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;

  border: 1px solid #0000001a;
  border-radius: 8px;
`;

export default UpdateCartButton;
