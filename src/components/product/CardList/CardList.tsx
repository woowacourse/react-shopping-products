import { Product } from '@appTypes/product';
import Card from '@components/product/Card/Card';

interface CardListProps {
  products: Product[];
  onToggleCart: (id: number) => void;
  isAddedCart: (id: number) => boolean;
}

const CardList: React.FC<CardListProps> = ({ products, onToggleCart, isAddedCart }) => {
  return (
    <>
      {products.map((product, index) => (
        <Card
          key={`${product.id}-${index}`}
          product={product}
          onToggleCart={() => onToggleCart(product.id)}
          isAddedCart={!isAddedCart(product.id)}
        />
      ))}
    </>
  );
};

export default CardList;
