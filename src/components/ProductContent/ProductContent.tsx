import { productPageTitle, productWrapper } from './ProductContent.style';
import ProductList from '../ProductList/ProductList';
import Filter from '../Filter/Filter';
import { useProductFilter } from '../../hooks/useProductFilter';
import { useCartManagement } from '../../hooks/useCartManager';
import useGetCarts from '../../hooks/useGetCarts';

function ProductContent() {
  const { carts, cartItemCount, refetchCarts } = useGetCarts();
  const { category, sort, handleChangeCategory, handleChangeSort } = useProductFilter();

  const { addCartItem, modifyCartItem } = useCartManagement({
    cartItemCount,
    carts,
    refetchCarts,
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
