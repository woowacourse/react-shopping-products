import { deleteCartItem } from '../../api/deleteCartItem';
import getCartItems from '../../api/getCartItems';
import { createCartItemViewModel, CartItemViewModel } from '../../api/model/createCartItemViewModel';
import patchCartItem from '../../api/patchCartItem';
import { useApiContext } from '../../contexts/ApiContext';
import { useErrorContext } from '../../contexts/ErrorContext';
import { RemoveFromCartButton } from '../CartButton/CartButton';
import Counter from '../Counter/Counter';
import Image from '../Image/Image';
import * as styles from './CartList.style';

export default function CartList() {
  const { showError } = useErrorContext();
  const { data: cartItems, fetcher: refetchCart } = useApiContext({ fetchFn: getCartItems, key: 'getCartItems' });

  const handleDeleteCart = async (cartItem: CartItemViewModel) => {
    try {
      await deleteCartItem(cartItem.id);
      await refetchCart();
    } catch (err) {
      if (err instanceof Error) showError(err);
    }
  };

  const handleMinus = async (item: CartItemViewModel) => {
    try {
      await patchCartItem(item.id, item.cartQuantity - 1);
      await refetchCart();
    } catch (err) {
      if (err instanceof Error) {
        showError(err);
      }
    }
  };

  const handlePlus = async (item: CartItemViewModel) => {
    if (item.cartQuantity >= item.productQuantity) {
      showError(new Error('수량을 초과해서 담을 수 없어요.'));
      return;
    }
    try {
      await patchCartItem(item.id, item.cartQuantity + 1);
      await refetchCart();
    } catch (err) {
      if (err instanceof Error) {
        showError(err);
      }
    }
  };

  return (
    <>
      {cartItems?.content.map((item) => {
        const viewModel = createCartItemViewModel(item);

        return (
          <div key={viewModel.id} css={styles.cartItemWrapper}>
            <div css={styles.cartItem}>
              <div css={styles.cartImageWrapper}>
                <Image src={viewModel.imageUrl} alt={`${viewModel.title} 상품 이미지`} />
              </div>
              <div css={styles.cartTextBlock}>
                <h3 css={styles.titleCss}>{viewModel.title}</h3>
                <p>{viewModel.price}</p>
                <Counter
                  value={viewModel.cartQuantity}
                  onDecrement={() => handleMinus(viewModel)}
                  onIncrement={() => handlePlus(viewModel)}
                />
              </div>
            </div>
            <RemoveFromCartButton onClick={() => handleDeleteCart(viewModel)} />
          </div>
        );
      })}
    </>
  );
}
