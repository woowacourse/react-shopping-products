import { deleteCartItem } from '../../api/deleteCartItem';
import getCartItems from '../../api/getCartItems';
import createCartItemsViewModel, { CartItemViewModel } from '../../api/model/createCartItemsViewModel';
import patchCartItem from '../../api/patchCartItem';
import { useApiContext } from '../../contexts/ApiContext';
import { CartItem } from '../../types/cartContents';
import { RemoveFromCartButton } from '../CartButton/CartButton';
import Counter from '../Counter/Counter';
import Image from '../Image/Image';
import * as styles from './CartList.style';

export default function CartList({
  cartItems,
  onClick
}: {
  cartItems: CartItem[];
  onClick: (cartItem: CartItemViewModel) => Promise<void>;
}) {
  const { fetcher: refetchCart } = useApiContext({ fetchFn: getCartItems, key: 'getCartItems' });

  const viewModel = createCartItemsViewModel(cartItems);

  const handleMinus = async (item: CartItemViewModel) => {
    if (item.cartQuantity - 1 <= 0) {
      await deleteCartItem(item.id);
    }
    await patchCartItem(item.id, item.cartQuantity - 1);
    await refetchCart();
  };
  const handlePlus = async (item: CartItemViewModel) => {
    if (item.cartQuantity >= item.productQuantity) return;
    await patchCartItem(item.id, item.cartQuantity + 1);
    await refetchCart();
  };

  return (
    <>
      {viewModel.map((item) => (
        <div key={item.id} css={styles.cartItemWrapper}>
          <div css={styles.cartItem}>
            <div css={styles.cartImageWrapper}>
              <Image src={item.imageUrl} alt={`${item.title} 상품 이미지`} />
            </div>
            <div css={styles.cartTextBlock}>
              <h3 css={styles.titleCss}>{item.title}</h3>
              <p>{item.price}</p>
              <Counter
                value={item.cartQuantity}
                onDecrement={() => handleMinus(item)}
                onIncrement={() => handlePlus(item)}
              />
            </div>
          </div>

          <RemoveFromCartButton onClick={() => onClick(item)} />
        </div>
      ))}
    </>
  );
}
