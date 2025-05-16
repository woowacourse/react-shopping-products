import { ShoppingBag } from "../icons";
import * as S from "./Header.styles";

const Header = ({ shoppingCount = 0 }: { shoppingCount?: number }) => {
  return (
    <S.HeaderWrapper>
      <span>SHOP</span>
      <S.ShoppingBagWrapper>
        <ShoppingBag />
        {shoppingCount !== 0 && <S.ShoppingBagCount>{shoppingCount}</S.ShoppingBagCount>}
      </S.ShoppingBagWrapper>
    </S.HeaderWrapper>
  );
};

export default Header;
