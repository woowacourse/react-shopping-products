import ErrorToast from '../../components/common/errorToast/ErrorToast';
import ProductItem from '../../components/productItem/ProductItem';
import Select from '../../components/select/Select';
import * as P from './ProductListPage.styles.tsx';
import useDataContext from '../../hooks/useDataContext';
import {
  CATEGORY_OPTIONS,
  SELECT_SORT_OPTIONS,
  PRODUCT_LIST_ITEM_COUNT,
} from '../../constants/systemConstants';
import ProductListPageSkeleton from './ProductListPageSkeleton.tsx';
import useProductHandler from '../../hooks/useProductHandler.ts';
import useErrorMessageContext from '../../hooks/useErrorMessageContext.ts';
import { getCartInCount } from '../../util/cartUtils';
import useCartItems from '../../hooks/useCartItems';

export const ProductListPage = () => {
  const { errorMessage, handleErrorMessage, isToastVisible } = useErrorMessageContext();
  const { cartItemsResource, productItemsResource } = useDataContext();

  const { loadingState, categoryOption, sortOption, handleCategoryOption, handleSortOption } =
    useProductHandler({
      dataResource: productItemsResource,
      handleErrorMessage,
    });

  const { handleAddCartItems, handleRemoveCartItems, handleUpdateCartItems } = useCartItems({
    dataResource: cartItemsResource,
    handleErrorMessage,
  });

  if (loadingState === 'loadingInitial') {
    return <ProductListPageSkeleton />;
  }

  return (
    <P.ProductListPageContainer
      data-testid="product-list-container"
      $isDimmed={loadingState === 'loadingFilter'}
    >
      {errorMessage && <ErrorToast message={errorMessage} visible={isToastVisible} />}
      <P.Title>bpple 상품 목록</P.Title>
      <P.SelectContainer>
        <Select
          value={categoryOption}
          options={CATEGORY_OPTIONS}
          onSelectedValue={(value) => handleCategoryOption(value)}
        />
        <Select
          value={sortOption}
          options={SELECT_SORT_OPTIONS}
          onSelectedValue={(value) => handleSortOption(value)}
        />
      </P.SelectContainer>

      <P.ProductItemContainer>
        {productItemsResource.data?.slice(0, PRODUCT_LIST_ITEM_COUNT).map((product) => (
          <ProductItem
            key={product.id}
            cartInCount={getCartInCount(cartItemsResource.data ?? [], product.id)}
            product={product}
            onAddCartItems={handleAddCartItems}
            onRemoveCartItems={handleRemoveCartItems}
            onUpdateCartItems={handleUpdateCartItems}
          />
        ))}
      </P.ProductItemContainer>
    </P.ProductListPageContainer>
  );
};
