import { css } from '@emotion/css';
import { Product } from './product.type';
import ProductCard from '../ProductCard';

const ProductCardList = ({ products }: { products: Product[] }) => {
  return (
    <div className={ProductCardListStyles}>
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};

export default ProductCardList;

const ProductCardListStyles = css`
  padding: 0 24px 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  row-gap: 20px;
`;
