import * as Styled from './ProductPage.styled';

import { Category, SortType } from './Product.types';
import { useMemo, useState } from 'react';

import AppLayout from '@components/layout/AppLayout/AppLayout';
import CardList from '@components/product/CardList/CardList';
import { CartItem } from '@appTypes/product';
import CartModal from '@components/product/CartModal/CartModal';
import Dropdown from '@components/common/Dropdown/Dropdown';
import ITEM_CATEGORIES from '@constants/itemCategories';
import ITEM_SORT_TYPE from '@constants/itemSortTypes';
import LoadingSpinner from '@components/common/LoadingSpinner/LoadingSpinner';
import WrongCat from '@components/common/WrongCat/WrongCat';
import useAddToCart from '@hooks/mutation/useAddToCart';
import useCartItems from '@hooks/query/useCartItem';
import useChangeCartItemQuantity from '@hooks/mutation/useChangeCartItemQuantity';
import useDeleteFromCart from '@hooks/mutation/useDeleteFromCart';
import useInfinityProducts from '@hooks/query/useInfinityProduct';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

const ProductPage = () => {
  const [category, setCategory] = useState<Category>('전체');
  const [sortType, setSortType] = useState<SortType>('낮은 가격순');

  const {
    isFetching,
    data: productPage,
    fetchNextPage: fetchNextProductPage,
  } = useInfinityProducts({
    category,
    sortType,
  });

  const products = useMemo(() => {
    return (
      productPage?.pages.flatMap(response => response?.content || []) || []
    );
  }, [productPage]);
  const { cartItems, getCartItemByProductId } = useCartItems();

  const { mutate: addToCart } = useAddToCart();
  const { mutate: deleteToCart } = useDeleteFromCart();
  const { mutate: changeCartItemQuantity } = useChangeCartItemQuantity();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const [isSortTypeDropdownOpen, setIsSortTypeDropdownOpen] = useState(false);

  const targetRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: () => fetchNextProductPage(),
  });

  const wrongCatElement = (
    <WrongCat
      $width='400px'
      $height='400px'
      message={
        '그런 건 내가 다 먹어버렸다냥~\n(사실 등록된 물건이 없는거라고 하네요)'
      }
    />
  );
  const loadingSpinnerElement = <LoadingSpinner $width='100%' $height='30vh' />;

  const itemsElement = (
    <Styled.ProductPageListWrapper>
      <CardList
        products={products}
        addToCart={addToCart}
        increaseCartItemQuantity={(productId: number) => {
          const cartItem = getCartItemByProductId(productId);
          if (!cartItem) return;
          changeCartItemQuantity({
            cartItemId: cartItem.id,
            quantity: cartItem.quantity + 1,
          });
        }}
        decreaseCartItemQuantity={(productId: number) => {
          const cartItem = getCartItemByProductId(productId);
          if (!cartItem) return;
          changeCartItemQuantity({
            cartItemId: cartItem.id,
            quantity: Math.min(cartItem.quantity - 1),
          });
        }}
        isAddedCart={(id: number) => getCartItemByProductId(id) !== undefined}
        getQuantity={(productId: number) => {
          const cartItem = getCartItemByProductId(productId);
          return cartItem?.quantity ?? 0;
        }}
      />
    </Styled.ProductPageListWrapper>
  );

  return (
    <AppLayout
      itemCount={cartItems?.length ?? 0}
      cartClick={() => setIsModalOpen(true)}
    >
      {isModalOpen && (
        <CartModal
          onClose={() => setIsModalOpen(false)}
          cartItems={cartItems ?? []}
          deleteItem={deleteToCart}
          increaseItemQuantity={(cartItem: CartItem) => {
            changeCartItemQuantity({
              cartItemId: cartItem.id,
              quantity: cartItem.quantity + 1,
            });
          }}
          decreaseItemQuantity={(cartItem: CartItem) => {
            changeCartItemQuantity({
              cartItemId: cartItem.id,
              quantity: Math.max(0, cartItem.quantity - 1),
            });
          }}
        />
      )}
      <Styled.ProductPageTitle>bpple 상품 목록</Styled.ProductPageTitle>
      <Styled.ProductDropdownWrapper>
        <Dropdown
          options={ITEM_CATEGORIES.slice()}
          nowSelectedOption={category}
          isOpen={isCategoryDropdownOpen}
          setIsOpen={setIsCategoryDropdownOpen}
          setOption={setCategory}
        />
        <Dropdown
          options={ITEM_SORT_TYPE.slice()}
          nowSelectedOption={sortType}
          isOpen={isSortTypeDropdownOpen}
          setIsOpen={setIsSortTypeDropdownOpen}
          setOption={setSortType}
        />
      </Styled.ProductDropdownWrapper>

      {itemsElement}

      {isFetching && loadingSpinnerElement}
      {!isFetching && products.length === 0 && wrongCatElement}

      {!isFetching && <Styled.ObserverTarget ref={targetRef} />}
    </AppLayout>
  );
};

export default ProductPage;
