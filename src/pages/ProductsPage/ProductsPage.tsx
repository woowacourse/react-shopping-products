import SelectBox from '../../components/common/SelectBox/SelectBox';
import Header from '../../components/Header/Header';
import ProductList from '../../components/ProductList/ProductList';
import useGetProducts from '../../hooks/useGetProducts';
import { CATEGORY } from '../../constants/products';
import useGetCarts from '../../hooks/useGetCartItems';
import Toast from '../../components/common/Toast/Toast';
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
  const {
    isLoading: isLoadingProducts,
    errorMessage: errorProductsMessage,
    products,
  } = useGetProducts({ category, sort });
  const { errorMessage: errorCartsMessage, carts, refetchCarts } = useGetCarts();
  const {
    handleAddCartItem,
    handleDeleteCartItem,
    isOverItemCounts,
    itemCount,
    errorAddCardItemMessage,
    errorDeleteCardItemMessage,
  } = useCartManagement({ refetchCarts, carts });

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
      {errorCartsMessage && <Toast text={errorCartsMessage} varient="error" />}
      {errorProductsMessage && <Toast text={errorProductsMessage} varient="error" />}
      {errorAddCardItemMessage && <Toast text={errorAddCardItemMessage} varient="error" />}
      {errorDeleteCardItemMessage && <Toast text={errorDeleteCardItemMessage} varient="error" />}
      {isOverItemCounts && (
        <Toast text="장바구니는 최대 50개의 상품을 담을 수 있습니다." varient="error" />
      )}
    </div>
  );
}

export default ProductsPage;
