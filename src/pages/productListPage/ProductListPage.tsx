import ErrorToast from '../../components/ErrorToast';
import ProductItem from '../../components/ProductItem';
import Select from '../../components/Select';
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
  const { cartItemsIds, handleAddCartItemsIds, handleRemoveCartItemsIds } = useCartContext();

  const { errorMessage, handleErrorMessage } = useErrorMessageContext();

  const {
    products,
    isLoading,
    categoryOption,
    sortOption,
    handleCategoryOption,
    handleSortOption,
  } = useProductHandler({
    handleErrorMessage,
  });

  if (isLoading) {
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
            isCartAdded={cartItemsIds.includes(product.id)}
            handleAddCartItem={handleAddCartItemsIds}
            handleRemoveCartItem={handleRemoveCartItemsIds}
          />
        ))}
      </P.ProductItemContainer>
    </P.ProductListPageContainer>
  );
};
