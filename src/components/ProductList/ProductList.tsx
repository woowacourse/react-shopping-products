import * as S from './ProductList.styled';
import ProductItem from '../ProductItem/ProductItem';
import { ResponseProduct } from '../../api/types';

function ProductList({ productList }: { productList: ResponseProduct[] }) {
  return (
    <S.ProductListContainer data-testid='product-list'>
      {productList.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </S.ProductListContainer>
  );
}

export default ProductList;
