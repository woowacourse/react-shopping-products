import Header from '../../common/Header';
import CartButton from './CartButton';

function ShopHeader({ itemsCount }: { itemsCount: number }) {
  return <Header title="SHOP" right={<CartButton itemsCount={itemsCount} />} />;
}
export default ShopHeader;
