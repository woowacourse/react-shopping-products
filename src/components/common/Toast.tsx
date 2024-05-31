import styled, { keyframes } from "styled-components";
import { SCREEN_WIDTH_REM } from "../../styles/GlobalStyle";

interface ToastProps {
  message: string;
  backgroundColor?: string;
}

const Toast = ({ message, backgroundColor = "gray" }: ToastProps) => {
  return <S.Container $backgroundColor={backgroundColor}>{message}</S.Container>;
};

export default Toast;

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const S = {
  Container: styled.section<{ $backgroundColor: string }>`
    position: fixed;
    top: 0;
    height: 4rem;

    width: ${`${SCREEN_WIDTH_REM}rem`};
    margin-top: 6.4rem;
    font-size: 1.2rem;
    background: #0a0d13;
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${slideDown} 0.5s ease-out;
  `,
};
