import { Header } from '@/components/common';
import { useCartContext } from '@/components/features/cart/context';
import { Modal } from '@jae-o/modal-component-module';
import CartButton from './CartButton';

function ShopHeader() {
  const { cartCount } = useCartContext();
  return (
    <Header
      title="SHOP"
      right={
        <Modal.OpenTrigger>
          <CartButton itemsCount={cartCount} />
        </Modal.OpenTrigger>
      }
    />
  );
}
export default ShopHeader;
