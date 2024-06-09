import * as S from './style';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface SelectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const SelectButton = ({ children, ...props }: SelectButtonProps) => {
  return <S.SelectButton {...props}>{children}</S.SelectButton>;
};

export default SelectButton;
