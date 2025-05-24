import * as S from './ProductList.styled';
import ProductItem from '../ProductItem/ProductItem';
import { ResponseProduct } from '../../api/types';
import { Dispatch } from 'react';

function ProductList({ productList, setErrorMessage }: { productList: ResponseProduct[]; setErrorMessage: Dispatch<React.SetStateAction<string>> }) {
  return (
    <S.ProductListContainer>
      {productList.map((product) => (
        <ProductItem key={product.id} product={product} setErrorMessage={setErrorMessage} />
      ))}
    </S.ProductListContainer>
  );
}

export default ProductList;
