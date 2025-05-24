import styled from '@emotion/styled';
import ProductCard from '../product-card/ProductCard';
import { Cart, Product } from '../type';

function ProductList({
  resource,
  cartList,
}: {
  resource: { read: () => Product[] };
  cartList: Cart[];
}) {
  const products = resource.read();

  return (
    <Container>
      {products.map(({ id, name, price, imageUrl }) => {
        const matchingCart = cartList.find((cart) => cart.product.id === id);
        return (
          <ProductCard
            key={id}
            id={id}
            cartId={matchingCart?.id ?? null}
            cartCount={matchingCart?.quantity ?? 0}
            name={name}
            price={price}
            imageUrl={imageUrl}
            isInCart={Boolean(matchingCart)}
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
