import { useShopErrorContext } from '@/pages/shop/context';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';
import { addCartItem, useCartContext } from '../../cart';

interface AddCartButtonProps {
  productId: string;
}

function AddCartButton({
  productId,
  ...props
}: AddCartButtonProps & ComponentProps<'button'>) {
  const { cartCount: totalCartCount, refetch } = useCartContext();
  const { showErrorMessage, hideErrorMessage } = useShopErrorContext();

  const handleAddCart = async () => {
    try {
      if (totalCartCount >= 50) {
        showErrorMessage('장바구니는 최대 50개까지 담을 수 있습니다.');
        return;
      }
      await addCartItem(productId);
      refetch();
      hideErrorMessage();
    } catch {
      showErrorMessage('장바구니에 담는 데 실패했습니다.');
    }
  };

  return (
    <Container onClick={handleAddCart} {...props}>
      <ButtonIcon src="./assets/icons/AddCart.svg" />
      <ButtonText>담기</ButtonText>
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  background-color: black;
  border-radius: 4px;
  padding: 4px 8px;
`;

const ButtonText = styled.p`
  color: white;
  font-size: 14px;
  font-weight: 600;
`;

const ButtonIcon = styled.img`
  width: 16px;
  height: 16px;
`;
export default AddCartButton;
