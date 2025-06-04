import styled from '@emotion/styled';

import { Product } from '../../../../api/products';
import ProductCard from './product-card/ProductCard';

function ProductList({
  resource,
}: {
  resource: { read: () => Product[] | null };
}) {
  const products = resource.read();
  if (!products) {
    throw new Error('상품 목록을 불러오는 중 오류가 발생했습니다.');
  }
  return (
    <Container id="product-list">
      {products.map(({ id, name, price, imageUrl, quantity }) => {
        return (
          <ProductCard
            key={id}
            id={id}
            name={name}
            price={price}
            imageUrl={imageUrl}
            quantity={quantity}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.ul`
  width: fit-content;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 16px;
  column-gap: 20px;
`;

export default ProductList;
