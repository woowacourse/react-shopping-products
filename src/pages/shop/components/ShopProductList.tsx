import { ProductCard, type Product } from '@/components/features/product';
import { useCartContext } from '@/components/features/cart/context';
import styled from '@emotion/styled';

function ShopProductList({
  resource,
}: {
  resource: { read: () => Product[] };
}) {
  const products = resource.read();
  const { cartList } = useCartContext();

  return (
    <Container>
      {products.map(({ id, name, price, imageUrl, quantity }) => {
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
            quantity={quantity}
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

export default ShopProductList;
