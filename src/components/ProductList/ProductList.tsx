import * as S from './ProductList.styled';
import ProductItem from '../ProductItem/ProductItem';
import { ResponseCartItem, ResponseProduct } from '../../api/types';
import { Dispatch } from 'react';

function ProductList({
  productList,
  cartItemList,
  setCartItemList,
  setErrorMessage,
}: {
  productList: ResponseProduct[];
  cartItemList: ResponseCartItem[];
  setCartItemList: Dispatch<React.SetStateAction<ResponseCartItem[]>>;
  setErrorMessage: Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <S.ProductListContainer>
      {productList.map((product) => (
        <ProductItem key={product.id} product={product} cartItemList={cartItemList} setCartItemList={setCartItemList} setErrorMessage={setErrorMessage} />
      ))}
    </S.ProductListContainer>
  );
}

export default ProductList;
