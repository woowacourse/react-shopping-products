import { BaseButton } from "./BaseButton";
import { StyledDeleteButton } from "./DeleteButton.styled";

interface DeleteButtonProps {
  onClick?: () => void;
}

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <BaseButton onClick={onClick}>
      <StyledDeleteButton>삭제</StyledDeleteButton>
    </BaseButton>
  );
};
