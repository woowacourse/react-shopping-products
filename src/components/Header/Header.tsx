import { CartItemApi } from "@/apis";
import { ShoppingBag } from "@/components/icons";
import { useQuery } from "@/modules";
import * as S from "./Header.styles";
import ShoppingCartModal from "./ShoppingCartModal";
import Modal from "../Modal/Modal";

export default function Header() {
  const { data: cartItems } = useQuery({
    queryFn: CartItemApi.getCartItems,
    queryKey: "cartItems",
  });

  const shoppingCount = cartItems?.content?.length ?? 0;

  return (
    <S.HeaderWrapper>
      <span>SHOP</span>
      <Modal.Wrapper>
        <Modal.Trigger>
          <S.ShoppingBagWrapper>
            <ShoppingBag />
            {shoppingCount !== 0 && <S.ShoppingBagCount>{shoppingCount}</S.ShoppingBagCount>}
          </S.ShoppingBagWrapper>
        </Modal.Trigger>

        <ShoppingCartModal />
      </Modal.Wrapper>
    </S.HeaderWrapper>
  );
}
