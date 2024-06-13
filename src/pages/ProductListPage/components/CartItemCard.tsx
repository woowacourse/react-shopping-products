import Button from '../../../components/Button/Button';
import { useDeleteCartItem } from '../../../hooks/useDeleteCartItem';
import { CartItemType } from '../../../types';
import styles from '../ProductListPage.module.css';
import ProductQuantity from './ProductQuantity';

interface Props {
  cartItem: CartItemType;
}

export const CartItemCard = ({ cartItem }: Props) => {
  const { name, price, imageUrl } = cartItem.product;
  const { handlerDeleteCartItem } = useDeleteCartItem();

  return (
    <div className={styles.cartItemCard}>
      <div className={styles.cartItemCardleft}>
        <img className={styles.cartItemProductImg} src={imageUrl} alt="" />
        <div className={styles.cartItemProductInfo}>
          <span className={styles.cartItemProductName}>{name}</span>
          <span className={styles.cartItemProductPrice}>{price.toLocaleString('KR-ko')}원</span>
          <ProductQuantity cartItem={cartItem} type={'list'} />
        </div>
      </div>
      <div className={styles.cartItemCardRight}>
        <Button onClick={() => handlerDeleteCartItem(cartItem.id)} disabled={false} text="삭제" />
      </div>
    </div>
  );
};
