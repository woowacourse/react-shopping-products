import {css} from '@emotion/react';
import CustomButton from '../../../shared/ui/CustomButton';
import Modal from '../../../shared/ui/Modal';
import {formatPrice} from '../../../shared/utils/formatPrice';
import {useApi} from '../../products/provider/apiProvider';
import {getCartProduct} from '../api/getCartProduct';
import CartCard from './CartCard';

import * as S from './CartModal.styles';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartModal({isOpen, onClose}: Props) {
  const {data: cartItems} = useApi(getCartProduct, 'cartItems');
  const totalPrice =
    cartItems?.content.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    ) || 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      position="bottom"
      title={{text: '장바구니', size: 20}}
    >
      {cartItems?.content.map((item) => (
        <CartCard
          key={item.id}
          cartId={item.id}
          product={item.product}
          quantity={item.quantity}
        />
      ))}
      <S.TotalPriceSection>
        <S.Description>총 결제 금액</S.Description>
        <S.TotalPrice>{formatPrice(totalPrice)}원</S.TotalPrice>
      </S.TotalPriceSection>
      <CustomButton
        title="닫기"
        onClick={onClose}
        css={css`
          padding: 10px;
        `}
      />
    </Modal>
  );
}
