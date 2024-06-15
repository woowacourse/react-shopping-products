import AddCartIcon from "@/assets/addCartIcon.svg";
import CartIcon from "@/assets/cartIcon.svg";
import DownArrow from "@/assets/downArrow.svg";
import DeleteCartIcon from "@/assets/deleteCartIcon.svg";
import { IconKind } from "@/components/_common/Icon";
import Minus from "@/assets/minusButton.svg";
import Plus from "@/assets/plusButton.svg";

export const IMAGES: Record<IconKind, string> = {
  addCart: AddCartIcon,
  cart: CartIcon,
  deleteCart: DeleteCartIcon,
  downArrow: DownArrow,
  minus: Minus,
  plus: Plus,
};
