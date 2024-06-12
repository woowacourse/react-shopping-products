import { BaseButton } from "./BaseButton";
import * as S from "./DeleteButton.styled";

interface DeleteButtonProp {
  onClick?: () => void;
}

export const DeleteButton = ({ onClick }: DeleteButtonProp) => {
  return (
    <BaseButton onClick={onClick} ariaLabel="삭제 버튼">
      <S.StyledDeleteButton>삭제</S.StyledDeleteButton>
    </BaseButton>
  );
};
