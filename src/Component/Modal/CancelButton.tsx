import { ComponentProps } from 'react';
import styled from '@emotion/styled';
import { useModal } from './ModalProvider';

interface CancelButtonProps {
  onClick?: () => void;
  width?: number;
}

function CancelButton({
  onClick,
  width,
  ...rest
}: CancelButtonProps & ComponentProps<'button'>) {
  const { setOpen } = useModal();

  return (
    <StyledButton
      onClick={() => {
        setOpen(false);
        onClick?.();
      }}
      width={width}
      {...rest}
    >
      닫기
    </StyledButton>
  );
}

export default CancelButton;

type StyledButtonProps = Pick<CancelButtonProps, 'width'>;

const StyledButton = styled.button<StyledButtonProps>`
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  height: 44px;
  color: white;
  border: 1px solid #33333340;
  border-radius: 5px;
  font-weight: bold;
  background-color: #333333;
  cursor: pointer;
`;
