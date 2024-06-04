import { CartIcon } from '@assets/index';
import CartListModal from '@components/CartListModal';
import { useState } from 'react';

import style from './style.module.css';

const BADGE_MAX_QUANTITY = 50;

interface CartActionButtonProps {
  // TODO : 삭제 (장바구니 받아오는 것으로, CartListModal에 props로 전달)
  cartItemsLength: number;
}

const CartBadgeButton = ({ cartItemsLength }: CartActionButtonProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const quantityClassName = `${style.quantity} ${cartItemsLength > BADGE_MAX_QUANTITY ? style.over : ''}`;

  const handleClickButton = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <button type="button" className={style.button} onClick={handleClickButton}>
        <img src={CartIcon} alt="장바구니 아이콘(장바구니 목록 열기)" />
        {!!cartItemsLength && (
          <div className={quantityClassName}>
            {cartItemsLength > BADGE_MAX_QUANTITY ? BADGE_MAX_QUANTITY : cartItemsLength}
          </div>
        )}
      </button>
      <CartListModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </>
  );
};

export default CartBadgeButton;
