import { BaseButton } from "./BaseButton";
import { StyledDeleteButton } from "./DeleteButton.styled";

interface DeleteButtonProp {
  onClick?: () => void;
}

export const DeleteButton = ({ onClick }: DeleteButtonProp) => {
  return (
    <BaseButton onClick={onClick} ariaLabel="삭제 버튼">
      <StyledDeleteButton>삭제</StyledDeleteButton>
    </BaseButton>
  );
};
