import CartIcon from '@assets/cart.svg';

import style from './style.module.css';

function CartBadgeButton() {
  return (
    <button className={style.button}>
      <img src={CartIcon} alt="장바구니 아이콘(장바구니 페이지 이동)" />
    </button>
  );
}

export default CartBadgeButton;
