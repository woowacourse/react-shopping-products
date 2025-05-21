import {
  HeaderWrapper,
  BasketWrapper,
  BasketCountTextWrapper,
} from "./Header.styled";
import { IMAGE_PATH } from "../../constants/imagePath";

type HeaderProps = {
  basketCount: number;
};

const Header = ({ basketCount }: HeaderProps) => {
  return (
    <HeaderWrapper>
      <img src={IMAGE_PATH.HEADER_TITLE} alt="shop-logo" />
      <BasketWrapper>
        {basketCount !== 0 && (
          <BasketCountTextWrapper>{basketCount}</BasketCountTextWrapper>
        )}
        <img src={IMAGE_PATH.SHOPPING_BASKET} alt="basket" />
      </BasketWrapper>
    </HeaderWrapper>
  );
};

export default Header;
