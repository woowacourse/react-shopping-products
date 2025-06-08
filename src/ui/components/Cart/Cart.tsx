import CartItem from './CartItem';
import CartTotal from './CartTotal';
import EmptyCart from './EmptyCart';
import { Container } from './Cart.styles';
import { useCart } from '../../../hooks/useCart';
import { useCartActions } from '../../../hooks/useCartActions';

interface CartProps {
  onClose?: () => void;
}

function Cart({ onClose }: CartProps) {
  const { cart } = useCart();
  const { handleUpdateQuantity, handleRemoveCart } = useCartActions();

  if (!cart || !cart.content) {
    return null;
  }

  const isEmptyCart = cart.content.length === 0;

  const handleRemoveItem = async (cartItemId: number) => {
    const item = cart.content.find((item) => item.id === cartItemId);
    if (item) {
      await handleRemoveCart({
        product: item.product,
        cartId: item.id,
        isInCart: true,
      });
    }
  };

  return (
    <>
      <Container>
        {isEmptyCart && <EmptyCart />}
        {cart.content.map((item) => (
          <CartItem
            key={item.id}
            cart={item}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        ))}
      </Container>
      <CartTotal cart={cart} onClose={onClose} />
    </>
  );
}

export default Cart;
