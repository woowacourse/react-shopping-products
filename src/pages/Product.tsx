import { useEffect, useRef, useState } from 'react';
import { useModal } from 'woowacourse-react-modal-component';

import {
  useFetchCartItems,
  useFetchProducts,
  useIntersectionObserver,
} from '../hooks/index';
import {
  Header,
  Dropdown,
  ErrorMessage,
  ProductCard,
  CartModal,
  LoadingSpinner,
} from '../components/index';
import { SortingParam } from '../types/sort';
import { DEFAULT_SORTING_PARAM } from '../constants/page';
import getCartItemByProduct from '../utils/getProductQuantity';

import * as S from './Product.styled';

function Product() {
  const target = useRef(null);
  const [sortings, setSortings] = useState<SortingParam[]>([
    DEFAULT_SORTING_PARAM,
  ]);
  const [filter, setFilter] = useState('');

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    products,
    isError: isProductsFetchError,
  } = useFetchProducts(sortings, filter);
  const { cartItems, isError: isCartItemsFetchError } = useFetchCartItems();

  const { observe, unobserve } = useIntersectionObserver(() => fetchNextPage());

  useEffect(() => {
    if (
      !target.current ||
      isFetchingNextPage ||
      isProductsFetchError ||
      !hasNextPage
    )
      return;
    const currentTarget = target.current;
    observe(currentTarget);

    return () => {
      if (currentTarget) {
        unobserve(currentTarget);
      }
    };
  }, [isFetchingNextPage, isProductsFetchError, hasNextPage]);

  const { isOpen: isDetailModalOpen, toggleModal: toggleDetailModal } =
    useModal();

  return (
    <>
      {isDetailModalOpen && (
        <CartModal
          cartItems={cartItems}
          isDetailModalOpen={isDetailModalOpen}
          toggleDetailModal={toggleDetailModal}
        />
      )}

      <Header
        badgeCount={cartItems.length}
        onToggleDetailModal={toggleDetailModal}
      />
      {(isProductsFetchError || isCartItemsFetchError) && <ErrorMessage />}
      <S.ProductContentWrapper>
        <S.ProductTitle>bpple 상품 목록</S.ProductTitle>
        <Dropdown setSortings={setSortings} setFilter={setFilter} />

        <S.ProductListContainer>
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                cartItem={getCartItemByProduct(cartItems, product.id)}
              />
            );
          })}
          <S.ObserverContainer ref={target} />
        </S.ProductListContainer>
        {isFetchingNextPage && <LoadingSpinner />}
      </S.ProductContentWrapper>
    </>
  );
}

export default Product;
