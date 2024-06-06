import { CartItem, Product } from '@appTypes/product';
import Card from '@components/product/Card/Card';

interface CardListProps {
  cartItems: CartItem[];
  products: Product[];
  isAddedCart: (id: number) => boolean;
}

const CardList: React.FC<CardListProps> = ({ cartItems, products, isAddedCart }) => {
  return (
    <>
      {products.map((product, index) => (
        <Card
          key={`${product.id}-${index}`}
          cartItems={cartItems}
          product={product}
          isAddedCart={!isAddedCart(product.id)}
        />
      ))}
    </>
  );
};

export default CardList;
