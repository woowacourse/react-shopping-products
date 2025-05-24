import { CartItem } from "../../../types/cartContents";
import CartCard from "../CartCard/CartCard";
import * as styles from "./CartList.style.tsx";

export default function CartList({ cartData }: { cartData?: CartItem[] }) {
  return (
    <div>
      <ul css={styles.cartListCss}>
        {cartData?.map((cartItem) => (
          <CartCard key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
    </div>
  );
}
