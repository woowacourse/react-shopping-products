import useToast from '@/hooks/_common/useToast';

import styled from '@emotion/styled';
import theme from '@/styles/theme.style';

const Toast = ({ message }: { message: string }) => {
  const isToastVisible = useToast();

  if (!isToastVisible) return null;

  return <S.Toast>{message}</S.Toast>;
};

export default Toast;

const S = {
  Toast: styled.div`
    position: absolute;
    top: 64px;
    left: 0;
    width: 100%;
    padding: 10px;
    background-color: ${theme.color.lightRed};
    text-align: center;
    box-sizing: border-box;
    transition: opacity 0.5s ease-in-out;
    font-size: ${theme.fontSize.xs};
    font-weight: ${theme.fontWeight.normal};
  `,
};
