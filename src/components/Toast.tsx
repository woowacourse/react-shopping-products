import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';
import useToast from '@/hooks/useToast';

const Toast = () => {
  const { showToast, error } = useToast();

  return showToast ? <S.Toast>{error?.message}</S.Toast> : null;
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
    opacity: 1;
  `,
};
