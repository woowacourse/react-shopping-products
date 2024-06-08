import { useState } from 'react';
import { CartContext } from '../CartContext';
import Dropdown, { Category } from '../components/Dropdown/Dropdown';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import Header from '../components/Header/Header';
import ProductList from '../components/ProductList/ProductList';
import useFetchAddCart from '../hooks/useFetchAddCart';
import useFetchProducts from '../hooks/useFetchProducts';
import { SortingParam } from '../types/sort';
import * as S from './Product.styled';

const Product = () => {
  const fetchAddCartState = useFetchAddCart();
  const [sortings, setSortings] = useState<SortingParam[]>([
    { name: 'price', order: 'asc' },
  ]);
  const [filter, setFilter] = useState<Category>('');

  const { products, isError, isPending, isLast, fetchNext, page } =
    useFetchProducts({ sortings, filter });

  return (
    <CartContext.Provider value={fetchAddCartState}>
      <Header badgeCount={fetchAddCartState.productIdSetInCart.size} />
      {isError && <ErrorMessage />}
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
    </CartContext.Provider>
  );
};

export default Product;
