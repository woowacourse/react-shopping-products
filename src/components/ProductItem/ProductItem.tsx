import { Product } from '../../App';
import AddToCardButton from '../AddToCardButton';
import RemoveFromCartButton from './RemoveFromCartButton';

const ProductItem = ({
  product,
  addToCart,
  isInCart,
  removeFromCart,
}: {
  product: Product;
  isInCart: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: ( productId:number) => void;
}) => {
  return (
    <div key={product.id}>
      <img
        src={product.imageUrl}
        alt={product.name}
        width="182px"
        height="112px"
      />
      <p>{product.name}</p>
      <p>{product.price.toLocaleString()}원</p>
      {isInCart ? (
        <RemoveFromCartButton onClick={() => removeFromCart(product.id)} />
      ) : (
        <AddToCardButton onClick={() => addToCart(product)} />
      )}
    </div>
  );
};

export default ProductItem;
