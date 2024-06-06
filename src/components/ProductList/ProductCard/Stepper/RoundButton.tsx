import React from 'react';
import S from './RoundButton.styled';
interface RoundButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  width: number;
  height: number;
}
const RoundButton = ({
  width,
  height,
  children,
  onClick,
}: RoundButtonProps) => {
  return (
    <S.RoundButton onClick={onClick} width={width} height={height}>
      {children}
    </S.RoundButton>
  );
};

export default RoundButton;
