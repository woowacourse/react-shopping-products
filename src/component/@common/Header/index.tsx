import { IconCart, IconLogo } from '../../../asset';
import CardQuantity from '../CardQuantity';
import { CartStyle, HeaderStyle } from './Header.styles';
import * as Dialog from '../Dialog/Dialog';
import CartSheet from '../../feature/CartSheet';
import useCartManager from '../../../hook/useCartManager';

const Header = ({ count }: { count: number }) => {
  const { cartData, handleRemoveCart, fetchCartData } = useCartManager();

  const handleBeforeOpen = async () => {
    await fetchCartData();
  };

  return (
    <Dialog.Root>
      <section css={HeaderStyle}>
        <a href="/">
          <img src={IconLogo} alt="logo" />
        </a>

        <Dialog.Trigger css={CartStyle} onBeforeOpen={handleBeforeOpen}>
          <img src={IconCart} alt="cart" />
          {count > 0 && <CardQuantity>{count}</CardQuantity>}
        </Dialog.Trigger>
      </section>

      <Dialog.Portal>
        <CartSheet cartData={cartData} handleRemoveCart={handleRemoveCart} />
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Header;
