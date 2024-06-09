import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import addCartIcon from '../../../assets/addCartIcon.png';
import removeCartIcon from '../../../assets/removeCartIcon.png';
import styles from '../ProductListPage.module.css';
import ProductQuantity from './ProductQuantity';
import { CartItemType } from '../../../types';
import { useAddCartItem } from '../../../hooks/useAddCartItem';

interface Props extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  isSelected: boolean;
  productItemId: number;
  cartItem: CartItemType | undefined;
}

const ProductSelectButton = ({ isSelected, cartItem, productItemId, ...props }: Props) => {
  const buttonStyle = isSelected ? 'remove' : 'add';
  const { handlerAddCartItem } = useAddCartItem();

  return (
    <>
      {isSelected ? (
        <ProductQuantity cartItem={cartItem as CartItemType} />
      ) : (
        <button
          className={`${styles.productCartButton} ${styles[buttonStyle]}`}
          onClick={() => handlerAddCartItem(productItemId)}
          {...props}
        >
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
