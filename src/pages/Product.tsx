import { useState } from 'react';
import { CartContext } from '../CartContext';
import Dropdown, { Category } from '../components/Dropdown/Dropdown';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import Header from '../components/Header/Header';
import ProductList from '../components/ProductList/ProductList';
import useFetchProducts from '../hooks/useFetchProducts';
import { SortingParam } from '../types/sort';
import * as S from './Product.styled';
import useFetchCart from '../hooks/useFetchCart';

import { Modal, useModalState } from 'lv2-modal-component';

const Product = () => {
  const cartState = useFetchCart();
  const [sortings, setSortings] = useState<SortingParam[]>([
    { name: 'price', order: 'asc' },
  ]);
  const [filter, setFilter] = useState<Category>('');

  const { products, isError, isPending, isLast, fetchNext, page } =
    useFetchProducts({ sortings, filter });

  const { isOpen, openModal, closeModal } = useModalState(false, {});

  return (
    <CartContext.Provider value={cartState}>
      <Header
        badgeCount={cartState.cartItems?.length ?? 0}
        onBadgeClick={openModal}
      />
      {isError && <ErrorMessage message={'에러'} />}
      {cartState.isError && <ErrorMessage message={'카트에러'} />}
      <S.ProductContentWrapper>
        <S.ProductTitle>bpple 상품 목록</S.ProductTitle>
        <Dropdown setFilter={setFilter} setSortings={setSortings} />
        <ProductList
          page={page}
          products={products}
          fetchNextPage={fetchNext}
          isPending={isPending}
          isLast={isLast}
          isError={isError}
        />
      </S.ProductContentWrapper>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <Modal.Positioner position={'bottom'} widthSize={'large'}>
          <Modal.Header title={'장바구니'} onClose={() => {}}></Modal.Header>
          <Modal.Content>
            <div>{JSON.stringify(cartState.cartItems)}</div>
          </Modal.Content>
        </Modal.Positioner>
      </Modal>
    </CartContext.Provider>
  );
};

export default Product;
