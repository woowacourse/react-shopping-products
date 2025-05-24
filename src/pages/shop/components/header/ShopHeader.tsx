import { Modal } from '@jae-o/modal-component-module';
import Header from '../../../../components/common/Header';
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
