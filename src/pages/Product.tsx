import { useState } from 'react';

import useFetchAddCart from '../hooks/useFetchAddCart';
import useFetchProducts from '../hooks/useFetchProducts';
import { CartContext } from '../CartContext';
import Header from '../components/Header/Header';
import Dropdown from '../components/Dropdown/Dropdown';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import ProductList from '../components/ProductList/ProductList';
import { SortingParam } from '../types/sort';

import * as S from './Product.styled';

function Product() {
  const fetchAddCartState = useFetchAddCart();
  const [sortings, setSortings] = useState<SortingParam[]>([]);
  const [filter, setFilter] = useState('');
  const { products, isError, isPending, isLast, fetchNextPage, page } =
    useFetchProducts(sortings, filter);

  return (
    <>
      <CartContext.Provider value={fetchAddCartState}>
        <Header badgeCount={fetchAddCartState.cartIdSet.size} />
        {isError && <ErrorMessage />}
        <S.ProductContentWrapper>
          <S.ProductTitle>bpple 상품 목록</S.ProductTitle>
          <Dropdown setSortings={setSortings} setFilter={setFilter} />
          <ProductList
            page={page}
            products={products}
            fetchNextPage={fetchNextPage}
            isPending={isPending}
            isLast={isLast}
          />
        </S.ProductContentWrapper>
      </CartContext.Provider>
    </>
  );
}

export default Product;
