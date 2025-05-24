import { Header } from '@/components/common';
import { Modal } from '@jae-o/modal-component-module';
import CartButton from './CartButton';

function ShopHeader({ itemsCount }: { itemsCount: number }) {
  return (
    <Header
      title="SHOP"
      right={
        <Modal.OpenTrigger>
          <CartButton itemsCount={itemsCount} />
        </Modal.OpenTrigger>
      }
    />
  );
}
export default ShopHeader;
