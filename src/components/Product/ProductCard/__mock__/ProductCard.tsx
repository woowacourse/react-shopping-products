export default function ProductCardMock({
  productId,
  price,
}: {
  productId: number;
  price: number;
}) {
  return (
    <li data-testid="product-card" data-price={price}>
      mock-{productId}
    </li>
  );
}
