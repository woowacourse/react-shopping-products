import styled from '@emotion/styled';
import ProductCard from '../product-card/ProductCard';

type ProductType = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

function ProductList({ products }: { products: ProductType[] }) {
  return (
    <Container>
      {products.map(({ id, name, price, imageUrl }) => (
        <ProductCard key={id} name={name} price={price} imageUrl={imageUrl} />
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
