import { CartItemApi } from "@/apis";
import { ShoppingBag } from "@/components/icons";
import useQuery from "@/modules/Query/useQuery/useQuery";
import Modal from "../Modal/Modal";
import * as S from "./Header.styles";
import ShoppingCartModal from "./ShoppingCartModal";

export default function Header() {
  const { data: cartItems } = useQuery({
    queryFn: CartItemApi.getCartItems,
    queryKey: "cartItems",
  });

  const shoppingCount = cartItems?.content?.length ?? 0;

  const handleShoppingBagClick = () => {};

  return (
    <S.HeaderWrapper>
      <span>SHOP</span>
      <Modal.Wrapper initialOpen>
        <Modal.Trigger>
          <S.ShoppingBagWrapper onClick={handleShoppingBagClick}>
            <ShoppingBag />
            {shoppingCount !== 0 && <S.ShoppingBagCount>{shoppingCount}</S.ShoppingBagCount>}
          </S.ShoppingBagWrapper>
        </Modal.Trigger>

        <ShoppingCartModal />
      </Modal.Wrapper>
    </S.HeaderWrapper>
  );
}
