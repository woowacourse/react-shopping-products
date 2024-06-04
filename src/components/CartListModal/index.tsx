import CartItems from '@mocks/data/cartItems.json';
import { BottomModal } from 'badahertz52-react-modules-components';
import React, { Dispatch, SetStateAction } from 'react';

import CartList from './CartList';
import style from './style.module.css';
import TotalAmount from './TotalAmount';
import { CartItem } from '@src/appTypes';

interface CartListModalProps {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}
const CartListModal = ({ isOpenModal, setIsOpenModal }: CartListModalProps) => {
  const rootEl = document.getElementById('root');
  return (
    <BottomModal modalTargetEl={rootEl} openModal={isOpenModal} setOpenModal={setIsOpenModal} animationDuration={2000}>
      <p className={style.title}>장바구니</p>
      <CartList />
      <TotalAmount cartItems={CartItems as CartItem[]} />
      <BottomModal.CloseButtonWrapper>
        <button className={style.closeButton}>닫기</button>
      </BottomModal.CloseButtonWrapper>
    </BottomModal>
  );
};

export default CartListModal;
