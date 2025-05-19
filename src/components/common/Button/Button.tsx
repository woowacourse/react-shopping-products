import * as S from './Button.styled';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  keyWord: 'add' | 'remove';
  onClick?: () => void;
}

function Button({ keyWord, onClick, children }: ButtonProps) {
  return (
    <S.CartButton keyWord={keyWord} onClick={onClick}>
      {children}
    </S.CartButton>
  );
}

export default Button;
