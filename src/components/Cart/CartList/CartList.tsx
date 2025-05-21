import { CartItem } from "../../../types/cartContents";
import CartCard from "../CartCard/CartCard";

export default function CartList({ cartData }: { cartData?: CartItem[] }) {
  return (
    <div>
      <ul>
        {cartData?.map((cartItem) => (
          <CartCard key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
    </div>
  );
}
