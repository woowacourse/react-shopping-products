import {
  HeaderWrapper,
  BasketWrapper,
  BasketCountTextWrapper,
} from "./Header.styled";
import { IMAGE_PATH } from "../../constants/imagePath";
import CartModal from "../CartModal/CartModal";
import { useState } from "react";

type HeaderProps = {
  basketCount: number;
};

const Header = ({ basketCount }: HeaderProps) => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <>
      <HeaderWrapper>
        <img src={IMAGE_PATH.HEADER_TITLE} alt="shop-logo" />
        <BasketWrapper onClick={() => setIsShowModal((prev) => !prev)}>
          {basketCount !== 0 && (
            <BasketCountTextWrapper>{basketCount}</BasketCountTextWrapper>
          )}
          <img src={IMAGE_PATH.SHOPPING_BASKET} alt="basket" />
        </BasketWrapper>
      </HeaderWrapper>

      {isShowModal && <CartModal onClose={() => setIsShowModal(false)} />}
    </>
  );
};

export default Header;
