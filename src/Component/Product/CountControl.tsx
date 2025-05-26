import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface CountControlProps {
  count: number;
  onClick: (type: 'decrease' | 'increase') => void;
  disabled: boolean;
}

export default function CountControl({
  count,
  onClick,
  disabled,
}: CountControlProps) {
  return (
    <StyledWrapper>
      <StyledButton
        onClick={() => onClick('decrease')}
        disabled={count === 0}
        data-testid="decrease-button"
      >
        <StyledImg src="./minusIcon.png" alt="minus icon" />
      </StyledButton>
      <StyledText>{count}</StyledText>
      <StyledButton
        onClick={() => onClick('increase')}
        disabled={disabled}
        data-testid="increase-button"
      >
        <StyledImg src="./plusIcon.png" alt="plus icon" />
      </StyledButton>
    </StyledWrapper>
  );
}

const disabledStyles = css`
  background: #fefefe;
  opacity: 0.2;
  cursor: auto;
`;

const StyledWrapper = styled.div`
  display: flex;
  gap: 13px;
  align-items: center;
`;

const StyledButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #0000001a;
  border-radius: 8px;
  background-color: white;
  padding: 6px;
  cursor: pointer;

  ${({ disabled }) => disabled && disabledStyles}
`;

const StyledImg = styled.img`
  width: 12px;
`;

const StyledText = styled.span`
  color: #0a0d13;
  font-weight: 500;
  font-size: 12px;
`;
