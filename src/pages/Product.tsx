import React from 'react';
import { CartContext } from '../CartContext';

import Header from '../components/Header/Header';
import Dropdown from '../components/Dropdown/Dropdown';
import * as S from './Product.styled';
import useFetchAddCart from '../hooks/useFetchAddCart';
import ProductList from '../components/ProductList/ProductList';
import AddCartButton from '../components/AddCartButton';

function Product() {
  const fetchAddCartState = useFetchAddCart();

  return (
    <CartContext.Provider value={fetchAddCartState}>
      <Header />
      <S.ProductTitle>bpple 상품 목록</S.ProductTitle>
      <Dropdown />
      <ProductList />
      <AddCartButton />
    </CartContext.Provider>
  );
}

export default Product;
