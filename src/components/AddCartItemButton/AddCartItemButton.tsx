import { AddToCartIcon } from "../../assets";
import Button from "../common/Button/Button";
import * as S from "./AddCartItemButton.style";

const AddCartItemButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button width={60} size="s" radius="s" color="primary" onClick={onClick}>
      <S.ButtonContent>
        <S.Icon src={AddToCartIcon} />
        <S.Content>담기</S.Content>
      </S.ButtonContent>
    </Button>
  );
};

export default AddCartItemButton;
