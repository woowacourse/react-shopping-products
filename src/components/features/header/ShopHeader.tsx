import Header from '../../common/Header';
import CartButton from './CartButton';

function ShopHeader() {
  return <Header title="SHOP" right={<CartButton itemsCount={10} />} />;
}
export default ShopHeader;
