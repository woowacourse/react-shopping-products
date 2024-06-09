import { Modal } from 'llqqssttyy-react-modules-components';

import { useEffect } from 'react';
import CartList from '../CartList';
import { cartQueries } from '../../../hooks/queries/cart';
import { priceFormatter } from '../../../utils/priceFormatter';

import * as S from './style';
import * as C from '../../common/commonStyles';

interface CartModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export default function CartModal({ isModalOpen, closeModal }: CartModalProps) {
  const { data: cartItems } = cartQueries.useGetCartItems();

  const totalPrice = cartItems.reduce(
    (totalPrice, { product, quantity }) =>
      totalPrice + quantity * product.price,
    0
  );

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      position={'bottom'}
      style={{ maxHeight: '80%' }}
    >
      <Modal.Title>장바구니</Modal.Title>

      <CartList cartItems={cartItems} />

      <S.PriceRowWrapper>
        <C.Divider />
        <S.PriceRow>
          <S.Label>총 결제 금액</S.Label>
          <C.Price size="large">{priceFormatter(totalPrice)}</C.Price>
        </S.PriceRow>
      </S.PriceRowWrapper>

      <Modal.Button onClick={closeModal}>닫기</Modal.Button>
    </Modal>
  );
}
