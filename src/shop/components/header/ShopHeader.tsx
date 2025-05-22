import Header from '../../../components/common/Header';
import CartButton from './CartButton';

function ShopHeader() {
  return <Header title="SHOP" right={<CartButton />} />;
}
export default ShopHeader;
