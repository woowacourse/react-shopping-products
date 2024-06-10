import { CartItemType } from '../../../types';
import styles from '../ProductListPage.module.css';

interface Props {
  cartItems: CartItemType[];
}

export const CartItemsTotalSummary = ({ cartItems }: Props) => {
  const orderPrice = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
  return (
    <div className={styles.cartItemTotalPriceContainer}>
      <span className={styles.cartItemTotalPriceTitle}>총 결제 금액</span>
      <span className={styles.cartItemTotalPrice}>{orderPrice.toLocaleString()}원</span>
    </div>
  );
};
