import { ShoppingBagIcon } from "@/components/icons";
import Modal from "../Modal/Modal";
import Text from "../Text/Text";
import * as S from "./Header.styles";
import ShoppingBagCount from "./ShoppingBagCount";
import ShoppingCartModal from "./ShoppingCartModal";

export default function Header() {
  return (
    <S.HeaderWrapper>
      <Text variant="title-1" css={S.titleText}>
        SHOP
      </Text>
      <Modal.Wrapper>
        <Modal.Trigger>
          <S.ShoppingBagWrapper>
            <ShoppingBagIcon />
            <ShoppingBagCount />
          </S.ShoppingBagWrapper>
        </Modal.Trigger>
        <ShoppingCartModal />
      </Modal.Wrapper>
    </S.HeaderWrapper>
  );
}
