import ErrorToast from '../../components/errorToast/ErrorToast';
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
import useCartHandler from '../../hooks/useCartHandler.ts';
import useProductHandler from '../../hooks/useProductHandler.ts';
import useErrorMessageContext from '../../hooks/useErrorMessageContext.ts';
import { useState, useEffect } from 'react';

export const ProductListPage = () => {
  const { cartItemsIds, handleAddCartItemsIds, handleRemoveCartItemsIds } = useCartContext();

  const { errorMessage, handleErrorMessage } = useErrorMessageContext();

  const { handleAddCartItem, handleRemoveCartItem } = useCartHandler({
    handleAddCartItemsIds,
    handleRemoveCartItemsIds,
    handleErrorMessage,
  });

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

  const [renderError, setRenderError] = useState(false);
  useEffect(() => {
    if (errorMessage.length !== 0) {
      setRenderError(true);
      return;
    }
    setTimeout(() => {
      setRenderError(false);
    }, 4000);
  }, [errorMessage]);

  if (loadingState === 'loadingInitial') {
    return <ProductListPageSkeleton />;
  }

  return (
    <P.ProductListPageContainer $isDimmed={loadingState === 'loadingFilter'}>
      {renderError && <ErrorToast errorMessage={errorMessage} />}
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
            handleAddCartItem={handleAddCartItem}
            handleRemoveCartItem={handleRemoveCartItem}
          />
        ))}
      </P.ProductItemContainer>
    </P.ProductListPageContainer>
  );
};
