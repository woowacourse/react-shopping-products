import {
  getProductList,
  ProductCard,
  type Product,
} from '@/components/features/product';
import { useCartContext } from '@/components/features/cart';
import styled from '@emotion/styled';
import { useJaeO } from '@/hooks/useJaeO';
import { Loading } from '@/components/common';
import { buildQueryString } from '@/api/buildQueryString';

function ShopProductList({
  filter,
}: {
  filter: { category: string; sort: string };
}) {
  const queryString = buildQueryString([
    {
      name: 'category',
      value: filter.category !== '전체' && filter.category,
    },
    { name: 'page', value: 0 },
    { name: 'size', value: 20 },
    { name: 'sort', value: `price,${filter.sort}` },
  ]);
  const {
    data: products,
    isLoading,
    isError,
  } = useJaeO<Product[]>({
    fetchKey: `/products?${queryString}`,
    fetchFn: () => {
      return getProductList(filter);
    },
  });
  const { cartList } = useCartContext();

  if (isLoading) return <Loading />;

  if (isError) return <div>데이터를 불러오는데 실패했습니다.</div>;

  return (
    <Container>
      {products.map(({ id, name, price, imageUrl, quantity }) => {
        const matchingCart = cartList.find((cart) => cart.product.id === id);
        return (
          <ProductCard
            key={id}
            id={id}
            cartId={matchingCart?.id}
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
