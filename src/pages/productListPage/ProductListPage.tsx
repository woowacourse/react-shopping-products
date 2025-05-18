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
import useProductHandler from '../../hooks/useProductHandler.ts';
import useErrorMessageContext from '../../hooks/useErrorMessageContext.ts';
import { useEffect, useRef, useState } from 'react';
import {
  ERROR_MESSAGE_DURATION,
  ERROR_MESSAGE_ANIMATION_DELAY,
} from '../../constants/systemConstants';

export const ProductListPage = () => {
  const { cartItems, handleAddCartItems, handleRemoveCartItems } = useCartContext();

  const cartItemsIds = cartItems.map((cartItem) => cartItem.product.id);

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

  const [, setIsVisible] = useState(false);
  const [, setShouldRender] = useState(false);

  const hideTimerRef = useRef<number | null>(null);
  const unmountTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (errorMessage.length === 0) return;

    setShouldRender(true);
    setIsVisible(true);

    hideTimerRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, ERROR_MESSAGE_DURATION);

    unmountTimerRef.current = window.setTimeout(() => {
      setShouldRender(false);
      handleErrorMessage('');
    }, ERROR_MESSAGE_DURATION + ERROR_MESSAGE_ANIMATION_DELAY);

    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (unmountTimerRef.current) clearTimeout(unmountTimerRef.current);
    };
  }, [errorMessage]);

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
            isCartAdded={cartItemsIds.includes(product.id)}
            handleAddCartItem={handleAddCartItems}
            handleRemoveCartItem={handleRemoveCartItems}
          />
        ))}
      </P.ProductItemContainer>
    </P.ProductListPageContainer>
  );
};
