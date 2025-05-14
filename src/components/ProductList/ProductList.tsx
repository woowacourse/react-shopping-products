import ProductItem from '../ProductItem/ProductItem';
import * as S from './ProductList.styled';
import { ResponseProduct } from '../../api/types';
function ProductList({ productList }: { productList: ResponseProduct[] }) {
  console.log('ProductList2', productList);
  return (
    <S.ProductListContainer>
      {productList.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </S.ProductListContainer>
  );
}

export default ProductList;
