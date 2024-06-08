import { Modal } from 'chlwlstlf-modal';
import CartItem from './CartItem';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../common/Button';
import styled from 'styled-components';
import Splitter from '../common/Splitter';
import useFetchCartItems from '../../hooks/useCartItems/useFetchCartItems';
import { Z_INDEX } from '../../constants/zIndex';
import EmptyCart from '../../assets/EmptyCart.png';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { cartItems } = useFetchCartItems();

  const totalAmount = cartItems.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);

  return (
    <StyledModal isOpen={isOpen} onClose={onClose} position="bottom" zIndex={Z_INDEX.MODAL}>
      <Modal.Header>
        <Modal.Title>장바구니</Modal.Title>
      </Modal.Header>

      <Modal.Content>
        {cartItems.length > 0 ? (
          <CartItemContainer>
            {cartItems.map((item) => (
              <CartItem key={item.id} cartItem={item} />
            ))}
          </CartItemContainer>
        ) : (
          <EmptyProductContainer>
            <img src={EmptyCart} alt="빈 상품 목록" />
            <p>장바구니가 비어있습니다.</p>
          </EmptyProductContainer>
        )}

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

const EmptyProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  padding-top: ${({ theme }) => theme.boxHeight};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: center;

  img {
    width: 150px;
  }
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
