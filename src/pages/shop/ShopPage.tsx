import { useCartContext } from '../../context/useCartContext';
import ShopHeader from '../../shop/components/header/ShopHeader';
import ProductFilterList from './product-filter-list/ProductFilterList';

function ShopPage() {
  const { cartList } = useCartContext();

  return (
    <>
      <ShopHeader itemsCount={cartList.length} />
      <ProductFilterList />
    </>
  );
}

export default ShopPage;
