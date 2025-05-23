import ErrorToast from '../../components/ErrorToast';
import ProductItem from '../../components/ProductItem';
import Select from '../../components/Select';
import * as P from './ProductListPage.styles.tsx';
import useCartHandler from '../../hooks/useCartHandler.ts';
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
  const { cartItems, handleAddCartItems, handleRemoveCartItems } = useCartHandler({
    handleErrorMessage,
  });
  const {
    products,
    isProductsLoading,
    categoryOption,
    sortOption,
    handleCategoryOption,
    handleSortOption,
  } = useProductHandler({
    handleErrorMessage,
  });

  const cartItemsIds = cartItems && cartItems.map(({ product }) => product.id);

  if (isProductsLoading) {
    return <ProductListPageSkeleton />;
  }

  return (
    <P.ProductListPageContainer>
      {errorMessage.length !== 0 && <ErrorToast errorMessage={errorMessage} />}
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
            isCartAdded={cartItemsIds.includes(product.id) ?? false}
            handleAddCartItem={handleAddCartItems}
            handleRemoveCartItem={handleRemoveCartItems}
          />
        ))}
      </P.ProductItemContainer>
    </P.ProductListPageContainer>
  );
};
