import { productPageTitle, productWrapper } from './ProductContent.style';
import ProductList from '../ProductList/ProductList';
import Filter from '../Filter/Filter';
import { useCartContext } from '../../contexts/CartContext';
import { useProductFilter } from '../../hooks/useProductFilter';
import { useCartManagement } from '../../hooks/useCartManager';

function ProductContent() {
  const { carts, cartItemCount, fetchCarts } = useCartContext();
  const { category, sort, handleChangeCategory, handleChangeSort } = useProductFilter();

  const { addCartItem, modifyCartItem } = useCartManagement({
    cartItemCount,
    carts,
    refetchCarts: fetchCarts,
  });

  return (
    <div className={productWrapper}>
      <h1 className={productPageTitle}>bpple 상품 목록</h1>
      <Filter onChangeCategory={handleChangeCategory} onChangeSort={handleChangeSort} />
      <ProductList
        category={category}
        sort={sort}
        onClickAddCartItem={addCartItem}
        onClickModifyCartItem={modifyCartItem}
      />
    </div>
  );
}

export default ProductContent;
