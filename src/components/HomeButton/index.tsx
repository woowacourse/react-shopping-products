import * as S from './style';

import { ButtonHTMLAttributes } from 'react';

import { LOGO } from '../../assets/images';

interface HomeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

const HomeButton = ({ onClick, ...props }: HomeButtonProps) => {
  return (
    <S.HomeButton onClick={onClick} {...props}>
      <img src={LOGO} alt="SHOP" />
    </S.HomeButton>
  );
};

export default HomeButton;
