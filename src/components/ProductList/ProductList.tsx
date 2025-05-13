import { css } from '@emotion/css';
import { ProductProps } from '../../types/product';
import Product from '../Product/Product';

const ProductListContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

function ProductList({ products }: { products: ProductProps[] }) {
  return (
    <ul className={ProductListContainer}>
      {products.map((product, idx) => (
        <Product key={idx} {...product} />
      ))}
    </ul>
  );
}

export default ProductList;
