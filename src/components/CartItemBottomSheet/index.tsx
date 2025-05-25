import * as S from "./CartItemBottomSheet.styled";
import BottomSheet from "../BottomSheet";
import { type CartItemType } from "@/apis/cartItems/cartItem.type";
import CartItemList from "./CartItemList";

interface CartItemBottomSheetProps {
  cartItems: CartItemType[];
  onRequestClose: () => void;
}

function CartItemBottomSheet({
  cartItems,
  onRequestClose,
}: CartItemBottomSheetProps) {
  const totalPrice = cartItems.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0
  );

  return (
    <BottomSheet title="장바구니" onRequestClose={onRequestClose}>
      <CartItemList cartItems={cartItems} />
      <S.TotalPriceBox>
        <S.TotalPriceText>총 결제 금액</S.TotalPriceText>
        <S.TotalPriceValue>{totalPrice.toLocaleString()}원</S.TotalPriceValue>
      </S.TotalPriceBox>
    </BottomSheet>
  );
}

export default CartItemBottomSheet;
