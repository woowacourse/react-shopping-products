import { useState } from 'react';
import { CartContext } from '../CartContext';
import Dropdown from '../components/Dropdown/Dropdown';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import Header from '../components/Header/Header';
import ProductList from '../components/ProductList/ProductList';
import useFetchAddCart from '../hooks/useFetchAddCart';
import useFetchProducts from '../hooks/useFetchProducts';
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
        <Header badgeCount={fetchAddCartState.productIdSetInCart.size} />
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
            isError={isError}
          />
        </S.ProductContentWrapper>
      </CartContext.Provider>
    </>
  );
}

export default Product;
