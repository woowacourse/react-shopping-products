import Header from '../../common/Header';
import CartButton from './CartButton';

function ShopHeader() {
  return <Header title="SHOP" right={<CartButton itemsCount={20} />} />;
}
export default ShopHeader;
