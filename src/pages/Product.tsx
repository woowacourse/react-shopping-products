import React, { useState } from 'react';
import { CartContext } from '../CartContext';
import Header from '../components/Header/Header';
import Dropdown from '../components/Dropdown/Dropdown';
import * as S from './Product.styled';
import useFetchAddCart from '../hooks/useFetchAddCart';
import ProductList from '../components/ProductList/ProductList';
import AddCartButton from '../components/AddCartButton';
import useFetchProducts from '../hooks/useFetchProducts';
import { SortingParam } from '../types/sort';

function Product() {
  const fetchAddCartState = useFetchAddCart();
  const [sortings, setSortings] = useState<SortingParam[]>([]);
  const [filter, setFilter] = useState('');
  const { products, isError, isPending, fetchNextPage, page } =
    useFetchProducts(sortings, filter);

  return (
    <CartContext.Provider value={fetchAddCartState}>
      <Header />
      <S.ProductTitle>bpple 상품 목록</S.ProductTitle>
      <Dropdown
        sortings={sortings}
        filter={filter}
        setSortings={setSortings}
        setFilter={setFilter}
      />
      <ProductList products={products} />
      <AddCartButton />
    </CartContext.Provider>
  );
}

export default Product;
