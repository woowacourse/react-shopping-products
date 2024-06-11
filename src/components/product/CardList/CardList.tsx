import Card from '@components/product/Card/Card';
import { Product } from '@appTypes/product';
import useAddToCart from '@hooks/mutation/useAddToCart';
import useCartItems from '@hooks/query/useCartItem';
import useChangeCartItemQuantity from '@hooks/mutation/useChangeCartItemQuantity';

interface CardListProps {
  products: Product[];
}

const CardList: React.FC<CardListProps> = ({ products }) => {
  const { getCartItemByProductId } = useCartItems();

  const { mutate: addToCart } = useAddToCart();
  const { mutate: changeCartItemQuantity } = useChangeCartItemQuantity();

  return (
    <>
      {products.map(product => (
        <Card
          key={`${product.id}`}
          product={product}
          addToCart={() => addToCart(product.id)}
          increaseCartItemQuantity={() => {
            const cartItem = getCartItemByProductId(product.id);
            if (!cartItem) return;
            changeCartItemQuantity({
              cartItemId: cartItem.id,
              quantity: cartItem.quantity + 1,
            });
          }}
          decreaseCartItemQuantity={() => {
            const cartItem = getCartItemByProductId(product.id);
            if (!cartItem) return;
            changeCartItemQuantity({
              cartItemId: cartItem.id,
              quantity: Math.max(0, cartItem.quantity - 1),
            });
          }}
          isAddedCart={getCartItemByProductId(product.id) === undefined}
          quantity={getCartItemByProductId(product.id)?.quantity || 0}
        />
      ))}
    </>
  );
};

export default CardList;
