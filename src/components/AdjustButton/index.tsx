import * as S from './style';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface AdjustButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const AdjustButton = ({ children, ...props }: AdjustButtonProps) => {
  return <S.AdjustButton {...props}>{children}</S.AdjustButton>;
};

export default AdjustButton;
