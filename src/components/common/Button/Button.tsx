import * as S from './Button.styled';
import React from 'react';

interface ButtonProps {
  text: string;
  icon: React.ReactNode;
  keyWord: 'add' | 'remove';
  onClick?: () => void;
}

function Button({ text, icon, keyWord, onClick }: ButtonProps) {
  return (
    <S.CartButton keyWord={keyWord} onClick={onClick}>
      {icon}
      {text}
    </S.CartButton>
  );
}

export default Button;
