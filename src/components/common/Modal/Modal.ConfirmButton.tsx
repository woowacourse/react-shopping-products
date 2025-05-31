import styled from '@emotion/styled';

import { BaseButton } from './Modal.BaseButton.styled';

const ModalConfirmButton = ({
  onClick,
  children,
  $autoFocus = false,
  type = 'button',
}: {
  onClick?: () => void;
  children: React.ReactNode;
  $autoFocus?: boolean;
  type?: 'button' | 'submit' | 'reset';
}) => {
  return (
    <StyledConfirmButton
      type={type}
      onClick={onClick}
      aria-label="confirmButton"
      autoFocus={$autoFocus}
    >
      {children}
    </StyledConfirmButton>
  );
};

export default ModalConfirmButton;

const StyledConfirmButton = styled(BaseButton)`
  width: 80px;
  height: 40px;
  padding: 8px 4px;
  background-color: #333333;
  color: #ffffff;

  border: none;
  border-radius: 4px;
`;
