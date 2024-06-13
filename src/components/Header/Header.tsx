import { MainLogo } from "../../assets";
import * as S from "./Header.style";
import ShoppingCartButton from "../ShoppingCartButton/ShoppingCartButton";
import ErrorBoundary from "../Error/ErrorBoundary";

function Header() {
  return (
    <S.HeaderBackground>
      <S.HeaderWrapper>
        <S.MainLogo src={MainLogo} alt="메인 로고" />
        <ErrorBoundary fallback={<>⚠️</>}>
          <ShoppingCartButton />
        </ErrorBoundary>
      </S.HeaderWrapper>
    </S.HeaderBackground>
  );
}

export default Header;
