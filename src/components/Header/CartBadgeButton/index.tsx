import CartIcon from '@assets/cart.svg';

import style from './style.module.css';

const BADGE_MAX_QUANTITY = 50;


function CartBadgeButton({ handleClick }: CartActionButtonProps) {
  const quantity = 51;
  const quantityClassName = `${style.quantity} ${quantity > BADGE_MAX_QUANTITY ? style.over : ''}`;

  return (
    <button className={style.button}>
      <img src={CartIcon} alt="장바구니 아이콘(장바구니 페이지 이동)" />
      {!!quantity && (
        <div className={quantityClassName}>{quantity > BADGE_MAX_QUANTITY ? BADGE_MAX_QUANTITY : quantity}</div>
      )}
    </button>
  );
}

export default CartBadgeButton;
