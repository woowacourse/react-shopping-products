import Header from '../../../components/common/Header';
import { useCartContext } from '../../../context/useCartContext';
import CartButton from './CartButton';

function ShopHeader() {
  const { cartList } = useCartContext();
  return (
    <Header title="SHOP" right={<CartButton itemsCount={cartList.length} />} />
  );
}
export default ShopHeader;
