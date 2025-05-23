import createCartItemsViewModel, { CartItemViewModel } from '../../api/model/createCartItemsViewModel';
import { CartItem } from '../../types/cartContents';
import { RemoveFromCartButton } from '../CartButton/CartButton';
import Image from '../Image/Image';
import * as styles from './CartList.style';

export default function CartList({
  cartItems,
  onClick
}: {
  cartItems: CartItem[];
  onClick: (cartItem: CartItemViewModel) => Promise<void>;
}) {
  return (
    <>
      {createCartItemsViewModel(cartItems).map((item) => (
        <div key={item.id} css={styles.cartItemWrapper}>
          <div css={styles.cartItem}>
            <div css={styles.cartImageWrapper}>
              <Image src={item.imageUrl} alt={`${item.title} 상품 이미지`} />
            </div>
            <div css={styles.cartTextBlock}>
              <h3>{item.title}</h3>
              <p>{item.price}</p>
            </div>
          </div>
          <RemoveFromCartButton onClick={() => onClick(item)} />
        </div>
      ))}
    </>
  );
}
