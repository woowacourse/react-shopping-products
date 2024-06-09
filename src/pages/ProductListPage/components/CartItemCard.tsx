import Button from '../../../components/Button/Button';
import { CartItemType } from '../../../types';
import styles from '../ProductListPage.module.css';
import ProductQuantity from './ProductQuantity';

interface Props {
  cartItem: CartItemType;
}

export const CartItemCard = ({ cartItem }: Props) => {
  const { name, price, imageUrl } = cartItem.product;

  return (
    <div className={styles.cartItemCard}>
      <div className={styles.cartItemCardHeader}>
        <Button onClick={() => console.log('삭제')} disabled={false} text="삭제" />
      </div>
      <div className={styles.cartItemCardProductContents}>
        <img className={styles.cartItemProductImg} src={imageUrl} alt="" />
        <div className={styles.cartItemProductInfo}>
          <span className={styles.cartItemProductName}>{name}</span>
          <span className={styles.cartItemProductPrice}>{price.toLocaleString()}원</span>
          <ProductQuantity cartItem={cartItem} />
        </div>
      </div>
    </div>
  );
};
