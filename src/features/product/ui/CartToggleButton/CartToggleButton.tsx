import { assets, ImgButton } from '@/shared';

import css from './CartToggleButton.module.css';

interface CartToggleButtonProps {
  isInCart: boolean;
  onClick: () => void;
}

export const CartToggleButton: React.FC<CartToggleButtonProps> = ({ isInCart, onClick }) => {
  return (
    <ImgButton
      className={`${css.cartToggleButton} ${isInCart ? css.inCart : ''}`}
      alt={isInCart ? '빼기' : '담기'}
      src={isInCart ? assets.removeFromCart : assets.addToCart}
      type='button'
      onClick={onClick}
    >
      {isInCart ? '빼기' : '담기'}
    </ImgButton>
  );
};
