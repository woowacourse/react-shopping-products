import SelectBox from '../../components/common/SelectBox/SelectBox';
import Header from '../../components/Header/Header';
import ProductList from '../../components/ProductList/ProductList';
import useGetProducts from '../../hooks/useGetProducts';
import { CATEGORY } from '../../constants/products';
import useGetCarts from '../../hooks/useGetCartItems';
import {
  productPageContainer,
  productWrapper,
  productPageTitle,
  selectBoxContainer,
} from './ProductsPage.style';
import useProductSort from '../../hooks/useProductSort';
import { SORT } from '../../constants/products';
import useProductCategory from '../../hooks/useProductCategory';
import useCartManagement from '../../hooks/useCartManagement';
import getProcessedCartArr from '../../utils/getProcessedCartArr';

function ProductsPage() {
  const { category, handleChangeCategory } = useProductCategory();
  const { sort, handleChangeSort } = useProductSort();
  const { isLoading: isLoadingProducts, products } = useGetProducts({ category, sort });
  const { carts, refetchCarts } = useGetCarts();
  const { handleAddCartItem, handleDeleteCartItem, itemCount } = useCartManagement({
    refetchCarts,
    carts,
  });

  return (
    <div className={productPageContainer}>
      <Header itemCount={itemCount} />
      <div className={productWrapper}>
        <h1 className={productPageTitle}>bpple 상품 목록</h1>
        <div className={selectBoxContainer}>
          <SelectBox placeHolder={CATEGORY[0]} options={CATEGORY} onChange={handleChangeCategory} />
          <SelectBox
            placeHolder={Object.keys(SORT)[0]}
            options={Object.keys(SORT)}
            onChange={handleChangeSort}
          />
        </div>
        {products && (
          <ProductList
            isLoadingProducts={isLoadingProducts}
            products={getProcessedCartArr({ carts, products })}
            onClickAddCartItem={handleAddCartItem}
            onClickDeleteCartItem={handleDeleteCartItem}
          />
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
