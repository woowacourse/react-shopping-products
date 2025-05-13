import { HeaderContainer } from "../styles/Header";
import { IMAGE_PATH } from "../constants/imagePath";

const Header = () => {
  return (
    <HeaderContainer>
      <img src={IMAGE_PATH.HEADER_TITLE} />
      <img src={IMAGE_PATH.SHOPPING_BASKET} />
    </HeaderContainer>
  );
};

export default Header;
