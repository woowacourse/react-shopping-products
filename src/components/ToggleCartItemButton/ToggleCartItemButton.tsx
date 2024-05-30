import { AddToCartIcon, RemoveFromCartIcon } from "../../assets";
import Button from "../common/Button/Button";
import * as S from "./ToggleCartItemButton.style";

interface ToggleCartItemButtonProps {
  isInCart: boolean;
  onClick: () => void;
}

const ToggleCartItemButton = ({
  isInCart,
  onClick,
}: ToggleCartItemButtonProps) => {
  return (
    <Button
      width={60}
      size="s"
      radius="s"
      color={isInCart ? "secondary" : "primary"}
      onClick={() => {
        onClick();
      }}
    >
      <S.ButtonContent>
        <S.Icon src={isInCart ? RemoveFromCartIcon : AddToCartIcon} />
        <S.Content>{isInCart ? "빼기" : "담기"}</S.Content>
      </S.ButtonContent>
    </Button>
  );
};

export default ToggleCartItemButton;
