import { Header } from '@/components/common';
import { useCartContext } from '@/components/features/cart';
import CartButton from './CartButton';

function ShopHeader() {
  const { cartCount } = useCartContext();
  return <Header title="SHOP" right={<CartButton itemsCount={cartCount} />} />;
}
export default ShopHeader;
