import styled from '@emotion/styled';
import ProductCard from '../product-card/ProductCard';
import { Product } from '../../../../pages/shop/ShopPage';

function ProductList({ resource }: { resource: { read: () => Product[] } }) {
  const products = resource.read();

  return (
    <Container>
      {products.map(({ id, name, price, imageUrl }) => (
        <ProductCard
          key={id}
          id={id}
          name={name}
          price={price}
          imageUrl={imageUrl}
        />
      ))}
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
