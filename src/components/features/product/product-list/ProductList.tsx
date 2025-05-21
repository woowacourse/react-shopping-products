import styled from '@emotion/styled';

import { Product } from '../type';
import ProductCard from './product-card/ProductCard';

function ProductList({
  resource,
}: {
  resource: { read: () => Product[] | null };
}) {
  const products = resource.read() ?? [];

  return (
    <Container id="product-list" data-testid="product-list">
      {products.map(({ id, name, price, imageUrl }) => {
        return (
          <ProductCard
            key={id}
            id={id}
            name={name}
            price={price}
            imageUrl={imageUrl}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  width: fit-content;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 16px;
  column-gap: 20px;
`;

export default ProductList;
