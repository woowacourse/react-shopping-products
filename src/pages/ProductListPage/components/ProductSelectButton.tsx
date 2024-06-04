import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import addCartIcon from '../../../assets/addCartIcon.png';
import removeCartIcon from '../../../assets/removeCartIcon.png';
import styles from '../ProductListPage.module.css';

interface Props extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  isSelected: boolean;
}

const ProductSelectButton = ({ isSelected, ...props }: Props) => {
  const buttonStyle = isSelected ? 'remove' : 'add';

  return (
    <button className={`${styles.productCartButton} ${styles[buttonStyle]}`} {...props}>
      <img
        src={isSelected ? removeCartIcon : addCartIcon}
        className={styles.productSelectButtonImg}
      />
      {isSelected ? '빼기' : '담기'}
    </button>
  );
};

export default ProductSelectButton;
