import CartItem from './CartItem';
import CartTotal from './CartTotal';
import EmptyCart from './EmptyCart';
import { CartResponse } from '../../../types/product';
import { Container } from './Cart.styles';

interface CartProps {
  cart: CartResponse;
  onUpdateQuantity?: (cartItemId: number, quantity: number) => Promise<void>;
  onRemoveItem?: (cartItemId: number) => Promise<void>;
  onClose?: () => void;
}

function Cart({ cart, onUpdateQuantity, onRemoveItem, onClose }: CartProps) {
  if (!cart || !cart.content) {
    return null;
  }

  const isEmptyCart = cart.content.length === 0;

  if (isEmptyCart) {
    return <EmptyCart />;
  }

  return (
    <>
      <Container>
        {isEmptyCart && <EmptyCart />}
        {cart.content.map((item) => (
          <CartItem
            key={item.id}
            cart={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </Container>
      <CartTotal cart={cart} onClose={onClose} />
    </>
  );
}

export default Cart;
