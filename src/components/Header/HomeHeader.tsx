import * as styles from './HomeHeader.style';
import { useApiContext } from '../../contexts/ApiContext';
import { CartItemResponse } from '../../types/response';
import getCartItems from '../../api/getCartItems';
import useErrorHandler from '../../hooks/useErrorHandler';
import Header from './Header';
import { useCallback, useState } from 'react';
import CartModal from '../Modal/CartModal';
import CartList from '../Cart/CartList';
import Image from '../Image/Image';
import { CartItemViewModel } from '../../api/model/createCartItemsViewModel';
import { deleteCartItem } from '../../api/deleteCartItem';
import { useErrorContext } from '../../contexts/ErrorContext';

function HomeHeader() {
  const [isAlertOpen, setAlertOpen] = useState(false);

  const handleToggle = () => {
    setAlertOpen((prev) => !prev);
  };
  const {
    data: cartItems,
    error: cartFetchError,
    isLoading,
    fetcher: refetchCart
  } = useApiContext<CartItemResponse>({
    fetchFn: getCartItems,
    key: 'getCartItems'
  });

  useErrorHandler(cartFetchError);

  const cartLength = cartItems?.content.length;
  const shouldShowCount = !isLoading && cartLength !== 0;

  const { showError } = useErrorContext();

  const handleDeleteCart = useCallback(
    async (cartItem: CartItemViewModel) => {
      try {
        await deleteCartItem(cartItem.id);
        await refetchCart();
      } catch (err) {
        if (err instanceof Error) showError(err);
      }
    },
    [refetchCart, showError]
  );

  return (
    <>
      <Header
        left={<p css={styles.logoCss}>SHOP</p>}
        right={
          <button onClick={handleToggle} css={styles.cartIcon}>
            <Image src="assets/cart.svg" alt="cart-icon" />
            {shouldShowCount && <span data-testid="cart-count">{cartLength}</span>}
          </button>
        }
      />
      {isAlertOpen && cartItems?.content && (
        <CartModal
          isOpen={isAlertOpen}
          onClose={() => setAlertOpen(false)}
          content={
            <div css={styles.modalContent}>
              <CartList cartItems={cartItems?.content} onClick={handleDeleteCart} />
            </div>
          }
        />
      )}
    </>
  );
}
export default HomeHeader;
