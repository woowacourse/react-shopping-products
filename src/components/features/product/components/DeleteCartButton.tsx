import { deleteCartItem, useCartContext } from '@/components/features/cart';
import { useShopErrorContext } from '@/pages/shop/context';
import styled from '@emotion/styled';

interface DeleteCartButtonProps {
  cartId?: string;
}

function DeleteCartButton({ cartId }: DeleteCartButtonProps) {
  const { refetch } = useCartContext();
  const { showErrorMessage, hideErrorMessage } = useShopErrorContext();

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
    <Container onClick={handleDeleteCart}>
      <img src="./assets/icons/DeleteCart.svg" width={12} />
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

export default DeleteCartButton;
