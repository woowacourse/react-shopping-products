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

function ProductsPage() {
  const { category, handleChangeCategory } = useProductCategory();
  const { sort, handleChangeSort } = useProductSort();
  const {
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    products,
  } = useGetProducts({ category, sort });
  const { isLoading: isLoadingCarts, isError: isErrorCarts, carts, refetchCarts } = useGetCarts();

  const {
    handleAddCartItem,
    handleDeleteCartItem,
    isErrorAddCardItem,
    isErrorDeleteCardItem,
    isOverItemCounts,
    itemCount,
  } = useCartManagement({ refetchCarts, carts });

  const getProcessedCartArr = () => {
    const cartIdArr = carts?.map((cart) => cart.product.id);
    return products?.map((product) => {
      if (cartIdArr?.includes(product.id)) {
        return {
          ...product,
          isAdd: true,
        };
      }

      return {
        ...product,
        isAdd: false,
      };
    });
  };

  if (isLoadingCarts) {
    return <div>로딩중...</div>;
  }

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
            products={getProcessedCartArr()}
            onClickAddCartItem={handleAddCartItem}
            onClickDeleteCartItem={handleDeleteCartItem}
          />
        )}
      </div>
      {isErrorCarts && <Toast text="장바구니 정보를 불러오지 못했습니다." varient="error" />}
      {isErrorProducts && <Toast text="상품 정보를 불러오지 못했습니다." varient="error" />}
      {isErrorAddCardItem && <Toast text="장바구니에 상품을 담지 못했습니다." varient="error" />}
      {isErrorDeleteCardItem && <Toast text="장바구니에 상품을 빼지 못했습니다." varient="error" />}
      {isOverItemCounts && (
        <Toast text="장바구니는 최대 50개의 상품을 담을 수 있습니다." varient="error" />
      )}
    </div>
  );
}

export default ProductsPage;
