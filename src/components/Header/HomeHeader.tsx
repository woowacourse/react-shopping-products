import * as styles from './HomeHeader.style';
import useErrorHandler from '../../hooks/useErrorHandler';
import Header from './Header';
import { useState } from 'react';
import CartModal from '../Modal/CartModal';
import Image from '../Image/Image';
import useCartItems from '../../hooks/api/useCartItems';

function HomeHeader() {
  const [isAlertOpen, setAlertOpen] = useState(false);

  const handleToggle = () => {
    setAlertOpen((prev) => !prev);
  };

  const { data: cartItems, error: cartFetchError, isLoading } = useCartItems();

  useErrorHandler(cartFetchError);

  const cartLength = cartItems?.content.length;
  const shouldShowCount = !isLoading && cartLength !== 0;

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
      {isAlertOpen && <CartModal isOpen={isAlertOpen} onClose={() => setAlertOpen(false)} />}
    </>
  );
}
export default HomeHeader;
