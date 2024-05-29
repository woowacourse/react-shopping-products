import { Product } from '@/types/product.type';
import ProductItem from './ProductItem';
import styled from '@emotion/styled';

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  return (
    <S.ListContainer>
      {products.map((product) => (
        <ProductItem key={product.id} item={product} />
      ))}
    </S.ListContainer>
  );
};

export default ProductList;

const S = {
  ListContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-grow: 1;
    gap: 20px;
    justify-items: center;
    width: 100%;
    height: calc(100vh - 200px);
    margin-top: 24px;
    z-index: -1;
    overflow-y: auto;
  `,
};
