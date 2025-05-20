import Header from '../../component/@common/Header/Header';
import {
  ShoppingListFilterItemStyle,
  ShoppingListFilterStyle,
  ShoppingListStyle,
  ShoppingListTitleStyle,
  emptyStateStyle,
  loadingStateStyle,
} from './ShoppingList.styles';
import Text from '../../component/@common/Text/Text';
import Dropdown from '../../component/@common/Dropdown/Dropdown';
import ArrowIcon from '../../component/@common/ArrowIcon/ArrowIcon';
import ProductCard from '../../component/feature/ProductCard/ProductCard';
import ProductListLayout from '../../component/feature/ProductListLayout/ProductListLayout';
import ErrorFallback from '../../component/@common/ErrorFallback/ErrorFallback';
import Button from '../../component/@common/Button/Button';

import useCart from '../../hook/useCart';
import { useToast } from '../../component/@common/Toast/context/toastContext';
import { cartApi } from '../../api/cart';
import {
  CartItem,
  CategoryOption,
  Product,
  SortOption,
} from '../../types/common';
import useShoppingItemList from '../../hook/useShoppingItemList';

const ShoppingList = () => {
  const { cartData, loadCartData } = useCart();
  const { openToast } = useToast();
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
  const categoryOptions: CategoryOption[] = ['전체', '패션잡화', '식료품'];
  const sortOptions: SortOption[] = ['높은 가격순', '낮은 가격순'];

  const handleAddCart = async (productId: number) => {
    try {
      await cartApi.addToCart(productId);

      loadCartData();
      openToast('상품이 장바구니에 추가되었습니다.', true);
    } catch (error) {
      openToast('장바구니 담기에 실패했어요...', false);
    }
  };

  const handleRemoveCart = async (cartId: number) => {
    try {
      const cartItem = cartData.filter(
        (item: CartItem) => item.product.id === cartId
      );

      if (!cartItem) {
        console.error('장바구니에서 해당 상품을 찾을 수 없습니다:', cartId);
        openToast('장바구니에서 상품을 찾을 수 없습니다.', false);
        return;
      }

      const targetId = cartItem[0].id;

      await cartApi.removeFromCart(targetId);

      await loadCartData();
      openToast('상품이 장바구니에서 제거되었습니다.', true);
    } catch (error) {
      console.error('장바구니 아이템 삭제 중 오류 발생:', error);
      openToast('장바구니 빼기에 실패했어요...', false);
    }
  };

  // 에러가 있을 경우 ErrorFallback 표시
  if (error) {
    return (
      <>
        <Header count={cartData.length} />
        <ErrorFallback
          error={error}
          onRetryClick={retryFetch}
          message="상품 목록을 불러오는데 실패했습니다"
        />
      </>
    );
  }

  const renderProductContent = () => {
    if (isLoading) {
      return (
        <div css={loadingStateStyle}>
          <div className="loading-spinner"></div>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div css={emptyStateStyle}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          <h3>상품이 없습니다</h3>
          <p>선택한 카테고리에 상품이 없거나 필터링 결과가 없습니다.</p>
          {category !== '전체' && (
            <div style={{ marginTop: '16px' }}>
              <Button onClick={() => handleCategoryClick('전체')}>
                모든 상품 보기
              </Button>
            </div>
          )}
        </div>
      );
    }

    return data.map((product: Product) => {
      const isInCart = cartData.some(
        (item: CartItem) => item.product.id === product.id
      );
      return (
        <ProductCard
          key={product.id}
          {...product}
          isInCart={isInCart}
          handleAddCart={handleAddCart}
          handleRemoveCart={handleRemoveCart}
        />
      );
    });
  };

  return (
    <>
      <Header count={cartData.length} />
      <section css={ShoppingListStyle}>
        <div css={ShoppingListTitleStyle}>
          <Text variant="title">bpple 상품 목록</Text>
          <div css={ShoppingListFilterStyle}>
            <div css={ShoppingListFilterItemStyle}>
              <Dropdown.Root>
                <Dropdown.Trigger>
                  {category}
                  <ArrowIcon />
                </Dropdown.Trigger>
                <Dropdown.List>
                  {categoryOptions.map((option) => (
                    <Dropdown.Item
                      key={option}
                      handleClick={handleCategoryClick}
                      content={option}
                    />
                  ))}
                </Dropdown.List>
              </Dropdown.Root>
            </div>
            <div css={ShoppingListFilterItemStyle}>
              <Dropdown.Root>
                <Dropdown.Trigger>
                  {selected}
                  <ArrowIcon />
                </Dropdown.Trigger>
                <Dropdown.List>
                  {sortOptions.map((option) => (
                    <Dropdown.Item
                      key={option}
                      handleClick={handleSortClick}
                      content={option}
                    />
                  ))}
                </Dropdown.List>
              </Dropdown.Root>
            </div>
          </div>
        </div>
      </section>
      <ProductListLayout>{renderProductContent()}</ProductListLayout>
    </>
  );
};

export default ShoppingList;
