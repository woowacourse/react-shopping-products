import React from 'react';
import S from './RoundButton.styled';
interface RoundButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  width: number;
  height: number;
  $isActive?: boolean;
}
const RoundButton = ({ width, height, children, $isActive = true, onClick }: RoundButtonProps) => {
  return (
    <S.RoundButton onClick={onClick} width={width} height={height} $isActive={$isActive}>
      {children}
    </S.RoundButton>
  );
};

export default RoundButton;
