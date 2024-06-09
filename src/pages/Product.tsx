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
import CartProvider from '../context/CartProvider';

import * as S from './Product.styled';

function Product() {
  const target = useRef(null);
  const [sortings, setSortings] = useState<SortingParam[]>([
    DEFAULT_SORTING_PARAM,
  ]);
  const [filter, setFilter] = useState('');

  const {
    data: products,
    isError,
    isLoading,
    isLast,
    fetchNextPage,
    resetPage,
  } = useFetchProducts(sortings, filter);
  const { cartItems } = useFetchCartItems();

  const { observe, unobserve } = useIntersectionObserver(() => fetchNextPage());

  useEffect(() => {
    if (!target.current || isLoading || isError || isLast) return;
    const currentTarget = target.current;
    observe(currentTarget);

    return () => {
      if (currentTarget) {
        unobserve(currentTarget);
      }
    };
  }, [isLoading, isError, isLast]);

  const { isOpen: isDetailModalOpen, toggleModal: toggleDetailModal } =
    useModal();

  return (
    <>
      <CartProvider>
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
        {isError && <ErrorMessage />}
        <S.ProductContentWrapper>
          <S.ProductTitle>bpple 상품 목록</S.ProductTitle>
          <Dropdown
            setSortings={setSortings}
            setFilter={setFilter}
            resetPage={resetPage}
          />

          <S.ProductListContainer>
            {products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
            <S.ObserverContainer ref={target} />
          </S.ProductListContainer>
          {isLoading && <LoadingSpinner />}
        </S.ProductContentWrapper>
      </CartProvider>
    </>
  );
}

export default Product;
