import { CartItem } from "../../../types/cartContents";
import CartCard from "../CartCard/CartCard";
import * as styles from "./CartList.style.jsx";
export default function CartList({ cartData }: { cartData?: CartItem[] }) {
  return (
    <div>
      <ul css={styles.cartList}>
        {cartData?.map((cartItem) => (
          <CartCard key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
    </div>
  );
}
