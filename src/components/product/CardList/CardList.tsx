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
      {products.length === 0 ? (
        <div style={{ width: '100%', height: '100vh' }}>상품 목록이 없어용 ㅜ</div>
      ) : (
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
      )}
    </>
  );
};

export default CardList;
