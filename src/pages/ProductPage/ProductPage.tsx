import * as Styled from './ProductPage.styled';

import { Category, SortType } from './Product.types';
import { useMemo, useState } from 'react';

import AppLayout from '@components/layout/AppLayout/AppLayout';
import CardList from '@components/product/CardList/CardList';
import CartModal from '@components/product/CartModal/CartModal';
import Dropdown from '@components/common/Dropdown/Dropdown';
import ITEM_CATEGORIES from '@constants/itemCategories';
import ITEM_SORT_TYPE from '@constants/itemSortTypes';
import LoadingSpinner from '@components/common/LoadingSpinner/LoadingSpinner';
import WrongCat from '@components/common/WrongCat/WrongCat';
import useAddToCart from '@hooks/mutation/useAddToCart';
import useCartItems from '@hooks/query/useCartItem';
import useDecreaseCartItemQuantityByCartId from '@hooks/mutation/useDecreaseCartItemQuantity';
import useDeleteFromCart from '@hooks/mutation/useDeleteFromCart';
import useIncreaseCartItemQuantity from '@hooks/mutation/useIncreaseCartItemQuantity';
import useInfinityProducts from '@hooks/query/useInfinityProduct';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useToastContext } from '@components/common/Toast/provider/ToastProvider';

const ProductPage = () => {
  const { showToast } = useToastContext();
  const errorHandler = (err: unknown) => {
    if (err instanceof Error) {
      showToast(err.message);
    }
  };

  const [category, setCategory] = useState<Category>('전체');
  const [sortType, setSortType] = useState<SortType>('낮은 가격순');

  const {
    isFetching,
    data: productPage,
    fetchNextPage: fetchNextProductPage,
  } = useInfinityProducts({
    category,
    sortType,
    errorHandler: errorHandler,
  });

  const products = useMemo(() => {
    return (
      productPage?.pages.flatMap(response => response?.content || []) || []
    );
  }, [productPage]);
  const { cartItems, getCartItemByProductId } = useCartItems({ errorHandler });

  const { mutate: addToCart } = useAddToCart({ errorHandler });
  const { mutate: deleteToCart } = useDeleteFromCart({ errorHandler });
  const { mutate: increaseCartItemQuantity } = useIncreaseCartItemQuantity({
    errorHandler,
  });
  const { mutate: decreaseCartItemQuantity } =
    useDecreaseCartItemQuantityByCartId({ errorHandler });

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
          if (cartItem !== undefined) increaseCartItemQuantity(cartItem.id);
        }}
        decreaseCartItemQuantity={(productId: number) => {
          const cartItem = getCartItemByProductId(productId);
          if (cartItem !== undefined) decreaseCartItemQuantity(cartItem.id);
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
          increaseItemQuantity={increaseCartItemQuantity}
          decreaseItemQuantity={decreaseCartItemQuantity}
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
