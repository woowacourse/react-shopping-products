import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import addCartIcon from '../../../assets/addCartIcon.png';
import removeCartIcon from '../../../assets/removeCartIcon.png';
import styles from '../ProductListPage.module.css';
import ProductQuantity from './ProductQuantity';
import { CartItemType } from '../../../types';

interface Props extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  isSelected: boolean;
  cartItem: CartItemType | undefined;
}

const ProductSelectButton = ({ isSelected, cartItem, ...props }: Props) => {
  const buttonStyle = isSelected ? 'remove' : 'add';

  return (
    <>
      {isSelected ? (
        <ProductQuantity cartItem={cartItem as CartItemType} />
      ) : (
        <button className={`${styles.productCartButton} ${styles[buttonStyle]}`} {...props}>
          <img
            src={isSelected ? removeCartIcon : addCartIcon}
            className={styles.productSelectButtonImg}
          />
          담기
        </button>
      )}
    </>
  );
};

export default ProductSelectButton;
