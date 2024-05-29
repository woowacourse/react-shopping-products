import { ImgButton, assets } from '@/shared';

import css from './CartButton.module.css';

interface CartButtonProps {
  cartItemCount: number;
}

export const CartButton = ({ cartItemCount }: CartButtonProps) => {
  return (
    <div className={css.cartButtonContainer}>
      <ImgButton className={css.button} alt='cart' src={assets.cart} type={'button'} onClick={() => {}} />;
      <div className={css.countWrapper}>
        <p className={css.count}>{cartItemCount}</p>
      </div>
    </div>
  );
};
