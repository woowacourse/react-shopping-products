import { CartItemType } from '../../../types';
import { CartItemCard } from './CartItemCard';
import styles from '../ProductListPage.module.css';

interface Props {
  cartItems: CartItemType[];
}

export const CartItemCardList = ({ cartItems }: Props) => {
  return (
    <div className={styles.cartItemCardList}>
      {cartItems.map((cartItem) => (
        <CartItemCard key={cartItem.id} cartItem={cartItem} />
      ))}
    </div>
  );
};
