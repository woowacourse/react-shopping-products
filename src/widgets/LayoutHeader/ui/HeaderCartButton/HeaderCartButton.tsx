import { ImgButton, assets } from '@/shared';

import css from './HeaderCartButton.module.css';

interface CartButtonProps {
  cartItemCount: number;
}

export const HeaderCartButton = ({ cartItemCount }: CartButtonProps) => {
  // FIXME: This will route to home page
  const handleOnClick = () => {
    console.log('clicked');
  };

  return (
    <div className={css.cartButtonContainer}>
      <ImgButton className={css.button} alt='cart' src={assets.cart} type={'button'} onClick={handleOnClick} />;
      <div className={css.countWrapper}>
        <p className={css.count}>{cartItemCount}</p>
      </div>
    </div>
  );
};
