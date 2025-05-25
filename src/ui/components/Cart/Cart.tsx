import CartItem from "./CartItem";
import {Container} from "./Cart.styles";
import { CartResponse } from "../../../types/product";

interface CartProps {
  cart: CartResponse;
}

function Cart({cart}: CartProps) {
  if (!cart || !cart.content) {
    return null;
  }

  return (
    <Container>
      {cart.content.map((item) => (
        <CartItem key={item.id} cart={item} />
      ))}
    </Container>
  );
}

export default Cart;

