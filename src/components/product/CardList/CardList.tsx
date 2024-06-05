import Card from '@components/product/Card/Card';
import { Product } from '@appTypes/product';

interface CardListProps {
  products: Product[];
  addToCart: (id: number) => void;
  increaseCartItemQuantity: (id: number) => void;
  decreaseCartItemQuantity: (id: number) => void;
  isAddedCart: (id: number) => boolean;
  getQuantity: (id: number) => number;
}

const CardList: React.FC<CardListProps> = ({
  products,
  addToCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  isAddedCart,
  getQuantity,
}) => {
  return (
    <>
      {products.map((product, index) => (
        <Card
          key={`${product.id}-${index}`}
          product={product}
          addToCart={addToCart}
          increaseCartItemQuantity={increaseCartItemQuantity}
          decreaseCartItemQuantity={decreaseCartItemQuantity}
          isAddedCart={!isAddedCart(product.id)}
          getQuantity={getQuantity}
        />
      ))}
    </>
  );
};

export default CardList;
