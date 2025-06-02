import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@emotion/react';

import CartContext from '../../../context/cartContext/cartContext';
import ModalContext from '../../../context/modalContext/modalContext';

import Text from '../../@common/Text/Text';
import Button from '../../@common/Button/Button';
import ModalItem from './ModalItem';
import EmptyCart from './EmptyCart';

import {
  cartModalStyle,
  cartModalOverlayStyle,
  cartModalItemListStyle,
  cartModalTotalPriceStyle,
} from './style/CartModal.styles';

const CartModal = () => {
  const { cartData } = useContext(CartContext);
  const { isOpen, close } = useContext(ModalContext);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const rootElement = document.getElementById('root') || document.body;

  return createPortal(
    <>
      <div css={cartModalOverlayStyle} onClick={close} />
      <div css={cartModalStyle}>
        <Text variant="title">장바구니</Text>
        {cartData.length > 0 ? (
          <>
            <div css={cartModalItemListStyle}>
              {cartData.map((item) => (
                <ModalItem key={item.id} cartItem={item} />
              ))}
            </div>
            <div css={cartModalTotalPriceStyle}>
              <Text variant="productName">총 상품 금액</Text>
              <Text variant="title">
                {cartData
                  .reduce(
                    (acc, item) => acc + item.product.price * item.quantity,
                    0
                  )
                  .toLocaleString()}
                원
              </Text>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}

        <Button
          onClick={close}
          variant="gray3"
          css={css`
            width: 100%;
            margin-top: 1rem;
            padding: 0.7rem;
            justify-content: center;
          `}
        >
          닫기
        </Button>
      </div>
    </>,
    rootElement
  );
};

export default CartModal;
