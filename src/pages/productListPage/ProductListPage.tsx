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
  const { cartItems, handleAddCartItems, handleRemoveCartItems, handleUpdateCartItems } =
    useCartContext();

  const getCartInCount = (productId: number) => {
    const cartItem = cartItems.find((cartItem) => cartItem.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

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
            cartInCount={getCartInCount(product.id)}
            product={product}
            handleAddCartItem={handleAddCartItems}
            handleRemoveCartItem={handleRemoveCartItems}
            handleUpdateCartItem={handleUpdateCartItems}
          />
        ))}
      </P.ProductItemContainer>
    </P.ProductListPageContainer>
  );
};
