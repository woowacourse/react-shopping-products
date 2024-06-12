import { Modal } from 'nakta-react-payments-components';
import CartItems from '../CartItems';
import styled from '@emotion/styled';

interface CartItemModalProps {
  totalAmount: number;
  isOpen: boolean;
  onClose: () => void;
}

const CartItemModal = ({ totalAmount, isOpen, onClose }: CartItemModalProps) => {
  return (
    <Modal position="bottom" isOpen={isOpen} onClose={onClose}>
      <Modal.Backdrop onClick={onClose} />
      <Modal.Content size="medium">
        <Modal.Header>
          <Modal.Title>장바구니</Modal.Title>
          <Modal.CloseButton onClick={onClose} />
        </Modal.Header>
        <Modal.Main>
          <CartItems />
          <TotalAmountContainer>
            <TotalAmountInfo>총 결제 금액</TotalAmountInfo>
            <TotalAmount>{totalAmount.toLocaleString('ko-KR')}원</TotalAmount>
          </TotalAmountContainer>
        </Modal.Main>
        <Modal.Footer align="column">
          <Modal.Button backgroundColor="primary" onClick={onClose} size="full">
            닫기
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default CartItemModal;

const TotalAmountContainer = styled.div`
  display: flex;
  justify-content: space-between;

  border-top: 1px solid ${(props) => props.theme.color.borderGray};
  padding-top: 0.75rem;
`;
const TotalAmountInfo = styled.span`
  ${(props) => props.theme.typography.cartItem.finalPriceInfo}
`;
const TotalAmount = styled.span`
  ${(props) => props.theme.typography.cartItem.finalPrice}
`;
