import { HeaderWrapper } from "../styles/Header";
import { IMAGE_PATH } from "../constants/imagePath";

const Header = () => {
  return (
    <HeaderWrapper>
      <img src={IMAGE_PATH.HEADER_TITLE} />
      <img src={IMAGE_PATH.SHOPPING_BASKET} />
    </HeaderWrapper>
  );
};

export default Header;
