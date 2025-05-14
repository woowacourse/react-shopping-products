import { HeaderWrapper, BasketWrapper, BasketCountTextWrapper } from "../styles/Header";
import { IMAGE_PATH } from "../constants/imagePath";

type HeaderProps = {
  basketCount : number;
};

const Header = ({basketCount}:HeaderProps) => {
  return (
    <HeaderWrapper>
      <img src={IMAGE_PATH.HEADER_TITLE} />
      <BasketWrapper>
        {basketCount !==0 && <BasketCountTextWrapper>{basketCount}</BasketCountTextWrapper>}
        <img src={IMAGE_PATH.SHOPPING_BASKET} />
      </BasketWrapper>
    </HeaderWrapper>
  );
};

export default Header;
