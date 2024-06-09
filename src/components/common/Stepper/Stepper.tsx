import React, { createContext, useContext } from 'react';
import RoundButton from './RoundButton';
import styled from 'styled-components';
import { PlusSign, MinusSign } from '../../../assets';

const PlusButton = ({ onClick, $isActive }: { onClick: () => void; $isActive?: boolean }) => {
  return <RoundButtonWithImg imgSrc={PlusSign} onClick={onClick} $isActive={$isActive} />;
};

const MinusButton = ({ onClick, $isActive }: { onClick: () => void; $isActive?: boolean }) => {
  return <RoundButtonWithImg imgSrc={MinusSign} onClick={onClick} $isActive={$isActive} />;
};

interface DisplayCounterProps {
  count: number;
  $width?: number;
  $height?: number;
}
const DisplayCounter = ({ count, $width = 40, $height = 32 }: DisplayCounterProps) => {
  return (
    <FlexDiv $width={$width} $height={$height}>
      {count}
    </FlexDiv>
  );
};

interface RoundButtonWithImgProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  imgSrc: string;
  $isActive?: boolean;
}
const RoundButtonWithImg = ({ onClick, imgSrc, $isActive }: RoundButtonWithImgProps) => {
  return (
    <div>
      <RoundButton width={28} height={28} onClick={onClick} $isActive={$isActive}>
        <FlexDiv>
          <Image src={imgSrc}></Image>
        </FlexDiv>
      </RoundButton>
    </div>
  );
};

const StyledLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const FlexDiv = styled.div<{ $width?: number; $height?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $width }) => `width:${$width}px;`}
  ${({ $height }) => `height:${$height}px;`}
`;
const Image = styled.img`
  width: 14px;
  height: 14px;

  //styleName: label;
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
`;

const Layout = { Horizontal: StyledLayout, Vertical: StyledLayout };
const Stepper = Object.assign(Layout, {
  MinusButton,
  PlusButton,
  DisplayCounter,
});

export default Stepper;
