import { useModalAction } from "easy-payments-ui";

import CartIcon from "../../icons/CartIcon";
import Logo from "../../icons/Logo";
import S from "./styledComponent";

function Header({ itemCount }: { itemCount: number }) {
  const { handleOpen } = useModalAction();

  return (
    <S.HeaderContainer>
      <Logo />
      <S.CartButton onClick={handleOpen}>
        <CartIcon />
        {itemCount > 0 && <S.ItemCount>{itemCount}</S.ItemCount>}
      </S.CartButton>
    </S.HeaderContainer>
  );
}

export default Header;
