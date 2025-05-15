import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

interface SpinnerProps {
  size?: number;
  color?: string;
}

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export default function Spinner({ size, color }: SpinnerProps) {
  return <StyledSpinner size={size} color={color} />;
}

const StyledSpinner = styled.div<SpinnerProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: ${(props) =>
    props.size
      ? `${Math.round(props.size / 10)}px solid rgba(0, 0, 0, 0.1)`
      : '1px solid black'};
  border-top: ${(props) =>
    props.size
      ? `${Math.round(props.size / 10)}px solid ${props.color}`
      : '1px solid black'};
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;
