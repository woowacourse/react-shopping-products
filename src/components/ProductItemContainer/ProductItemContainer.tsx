import { Product } from '../../types/products';
import ProductItem from '../ProductItem/ProductItem';
import * as Styled from './ProductItemContainer.style';

interface ProductItemContainerProps {
  products: Product[];
}

export default function ProductItemContainer({ products }: ProductItemContainerProps) {
  return (
    <Styled.Container>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          isInCart={false}
        />
      ))}
    </Styled.Container>
  );
}
