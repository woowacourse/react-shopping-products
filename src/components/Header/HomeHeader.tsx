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
import Button from '../Button/Button';

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

  const totalPrice = cartItems?.content.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

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
          title="장바구니"
          content={
            <div css={styles.modalContent}>
              <CartList cartItems={cartItems?.content} onClick={handleDeleteCart} />
            </div>
          }
          footer={
            <div css={styles.footerCss}>
              <div css={styles.totalPriceCss}>
                <p>총 결제 금액</p> <p>{totalPrice?.toLocaleString() + '원'}</p>
              </div>
              <Button css={styles.buttonCss} onClick={() => setAlertOpen(false)}>
                닫기
              </Button>
            </div>
          }
        />
      )}
    </>
  );
}
export default HomeHeader;
