import createCartItemsViewModel from '../../api/model/createCartItemsViewModel';
import { CartItem } from '../../types/cartContents';
import Image from '../Image/Image';
import * as styles from './CartList.style';

export default function CartList({ cartItems }: { cartItems: CartItem[] | undefined }) {
  return (
    <>
      {createCartItemsViewModel(cartItems)?.map((item) => (
        <div key={item.itemId} css={styles.cartItem}>
          <div css={styles.cartImageWrapper}>
            <Image src={item.imageUrl} alt={`${item.title} 상품 이미지`} />
          </div>
          <div css={styles.cartTextBlock}>
            <h3>{item.title}</h3>
            <p>{item.price}</p>
          </div>
        </div>
      ))}
    </>
  );
}
