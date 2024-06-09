import useToast from '@/hooks/_common/useToast';

import { STYLE_THEME } from '@/styles/constants/theme';
import styled from '@emotion/styled';

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
    background-color: ${STYLE_THEME.color.lightRed};
    text-align: center;
    box-sizing: border-box;
    transition: opacity 0.5s ease-in-out;
    font-size: ${STYLE_THEME.fontSize.xs};
    font-weight: ${STYLE_THEME.fontWeight.normal};
    color: ${STYLE_THEME.color.black};
  `,
};
