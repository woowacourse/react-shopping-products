import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';

interface Props {
  message: string;
}

const Toast = ({ message }: Props) => {
  return <S.Toast>{message}</S.Toast>;
};

export default Toast;

const S = {
  Toast: styled.div`
    position: absolute;
    top: 64px;
    width: 100%;
    padding: 10px;
    background-color: ${theme.color.lightRed};
    text-align: center;
    box-sizing: border-box;
    transition: opacity 0.5s ease-in-out;
    font-size: ${theme.fontSize.xsmall};
    font-weight: ${theme.fontWeight.normal};
  `,
};
