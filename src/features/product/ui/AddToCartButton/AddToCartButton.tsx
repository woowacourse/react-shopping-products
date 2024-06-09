import { assets, ImgButton } from '@/shared';

import css from './AddToCartButton.module.css';

interface AddToCartButtonProps {
  onClick: () => void;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ onClick }) => {
  return (
    <ImgButton className={css.AddToCartButton} alt='담기' src={assets.addToCart} type='button' onClick={onClick}>
      담기
    </ImgButton>
  );
};
