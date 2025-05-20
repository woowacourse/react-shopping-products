import ErrorToast from '../../components/common/errorToast/ErrorToast';
import ProductItem from '../../components/productItem/ProductItem';
import Select from '../../components/select/Select';
import * as P from './ProductListPage.styles.tsx';
import useCartContext from '../../hooks/useCartContext';
import {
  CATEGORY_OPTIONS,
  SELECT_SORT_OPTIONS,
  PRODUCT_LIST_ITEM_COUNT,
} from '../../constants/systemConstants';
import ProductListPageSkeleton from './ProductListPageSkeleton.tsx';
import useProductHandler from '../../hooks/useProductHandler.ts';
import useErrorMessageContext from '../../hooks/useErrorMessageContext.ts';

export const ProductListPage = () => {
  const { cartItems, handleAddCartItems, handleRemoveCartItems } = useCartContext();

  const getCountInCart = (id: number) => {
    const cartItem = cartItems.filter((cartItem) => cartItem.product.id === id);
    return cartItem ? cartItem.length : 0;
  };

  const { errorMessage, handleErrorMessage } = useErrorMessageContext();

  const {
    products,
    loadingState,
    categoryOption,
    sortOption,
    handleCategoryOption,
    handleSortOption,
  } = useProductHandler({
    handleErrorMessage,
  });

  if (loadingState === 'loadingInitial') {
    return <ProductListPageSkeleton />;
  }

  return (
    <P.ProductListPageContainer $isDimmed={loadingState === 'loadingFilter'}>
      {errorMessage.length > 0 && <ErrorToast errorMessage={errorMessage} />}
      <P.Title>bpple 상품 목록</P.Title>
      <P.SelectContainer>
        <Select
          value={categoryOption}
          options={CATEGORY_OPTIONS}
          handleSelectedValue={(value) => handleCategoryOption(value)}
        />
        <Select
          value={sortOption}
          options={SELECT_SORT_OPTIONS}
          handleSelectedValue={(value) => handleSortOption(value)}
        />
      </P.SelectContainer>

      <P.ProductItemContainer>
        {products.slice(0, PRODUCT_LIST_ITEM_COUNT).map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            countInCart={getCountInCart(product.id)}
            handleAddCartItem={handleAddCartItems}
            handleRemoveCartItem={handleRemoveCartItems}
          />
        ))}
      </P.ProductItemContainer>
    </P.ProductListPageContainer>
  );
};

// isCartAdded를 count로 바꿀 것
