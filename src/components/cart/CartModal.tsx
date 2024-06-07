import { Modal } from 'chlwlstlf-modal';
import CartItem from './CartItem';
import { formatCurrency } from '../../utils/formatCurrency';
import useCartItems from '../../hooks/useCartItems/useCartItems';
import Button from '../common/Button';
import styled from 'styled-components';
import Splitter from '../common/Splitter';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { cartItems } = useCartItems();
  const totalAmount = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <StyledModal isOpen={isOpen} onClose={onClose} position="bottom">
      <Modal.Header>
        <Modal.Title>장바구니</Modal.Title>
      </Modal.Header>

      <Modal.Content>
        <CartItemContainer>
          {cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))}
        </CartItemContainer>

        <TotalAmountContainer>
          <Splitter />
          <TotalAmountWrapper>
            <p>총 결제금액</p>
            <strong>{formatCurrency(totalAmount)}</strong>
          </TotalAmountWrapper>
        </TotalAmountContainer>
      </Modal.Content>

      <Modal.Footer>
        <Button onClick={onClose}>닫기</Button>
      </Modal.Footer>
    </StyledModal>
  );
};

export default CartModal;

const StyledModal = styled(Modal)`
  display: flex;
  width: 100vw;
  color: black;
  overflow-y: auto;
  gap: 24px;
  .modal-content {
    gap: 24px;
  }
`;

const CartItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TotalAmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
`;

const TotalAmountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 42px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  p {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
  strong {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;
