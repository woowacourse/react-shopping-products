import Header from '../../component/@common/Header';
import {
  ProductContentContainer,
  ShoppingListStyle,
} from './ShoppingList.styles';
import ErrorFallback from '../../component/@common/ErrorFallback';
import ShoppingListHeader from '../../component/feature/ShoppingListHeader';
import ProductContent from '../../component/feature/ProductContent';
import useShoppingItemList from '../../hook/useShoppingItemList';
import useCartManager from '../../hook/useCartManager';

const ShoppingList = () => {
  const {
    data,
    handleSortClick,
    handleCategoryClick,
    selected,
    category,
    error,
    isLoading,
    retryFetch,
  } = useShoppingItemList();

  const { cartData, handleAddCart, handleRemoveCart } = useCartManager();

  // 에러가 있을 경우 ErrorFallback 표시
  if (error) {
    return (
      <>
        <Header count={cartData.length} />
        <ErrorFallback
          error={error}
          resetErrorBoundary={retryFetch}
          message="상품 목록을 불러오는데 실패했습니다"
        />
      </>
    );
  }

  return (
    <>
      <Header count={cartData.length} />
      <section css={ShoppingListStyle}>
        <ShoppingListHeader
          category={category}
          selected={selected}
          handleCategoryClick={handleCategoryClick}
          handleSortClick={handleSortClick}
        />
      </section>
      <div css={ProductContentContainer}>
        <ProductContent
          isLoading={isLoading}
          data={data}
          cartData={cartData}
          category={category}
          handleAddCart={handleAddCart}
          handleRemoveCart={handleRemoveCart}
          handleCategoryClick={handleCategoryClick}
        />
      </div>
    </>
  );
};

export default ShoppingList;
