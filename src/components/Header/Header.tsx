import { MainLogo } from "../../assets";
import * as S from "./Header.style";
import useCartItem from "../../hooks/useCartItem";
import ShoppingCartButton from "../ShoppingCartButton/ShoppingCartButton";

function Header() {
  const { fetchCartItemList } = useCartItem();
  const quantity = fetchCartItemList.data?.content.length;

  return (
    <S.HeaderBackground>
      <S.HeaderWrapper>
        <S.MainLogo src={MainLogo} alt="메인 로고" />
        <ShoppingCartButton quantity={quantity} />
      </S.HeaderWrapper>
    </S.HeaderBackground>
  );
}

export default Header;
