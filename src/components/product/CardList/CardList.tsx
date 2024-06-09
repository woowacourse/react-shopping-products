import { Product } from '@appTypes/product';
import Card from '@components/product/Card/Card';
import useShoppingCart from '@queries/shoppingCart/useShoppingCart';

interface CardListProps {
  products: Product[];
}

const CardList: React.FC<CardListProps> = ({ products }) => {
  const { cartItems } = useShoppingCart();

  return (
    <>
      {products.map((product, index) => (
        <Card
          key={`${product.id}-${index}`}
          cartItem={cartItems.find((cartItem) => cartItem.product.id === product.id) ?? null}
          product={product}
        />
      ))}
    </>
  );
};

export default CardList;
