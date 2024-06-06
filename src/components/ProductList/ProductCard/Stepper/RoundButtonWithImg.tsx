import React, { createContext, useContext } from 'react';
import RoundButton from './RoundButton';
import styled from 'styled-components';
import { PlusSign, MinusSign } from '../../../../assets';

import useCounter from './useCounter';

const PlusButton = ({ onClick }: { onClick: () => void }) => {
  return <RoundButtonWithImg imgSrc={PlusSign} onClick={onClick} />;
};

const MinusButton = ({ onClick }: { onClick: () => void }) => {
  return <RoundButtonWithImg imgSrc={MinusSign} onClick={onClick} />;
};

const DisplayCounter = ({ count }: { count: number }) => {
  return (
    <SFlexDiv $width={40} $height={32}>
      {count}
    </SFlexDiv>
  );
};

interface RoundButtonWithImgProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  imgSrc: string;
}
const RoundButtonWithImg = ({ onClick, imgSrc }: RoundButtonWithImgProps) => {
  return (
    <div>
      <RoundButton width={28} height={28} onClick={onClick}>
        <SFlexDiv>
          <SImg src={imgSrc}></SImg>
        </SFlexDiv>
      </RoundButton>
    </div>
  );
};

const SLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const SFlexDiv = styled.div<{ $width?: number; $height?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $width }) => `width:${$width}px;`}
  ${({ $height }) => `height:${$height}px;`}
`;
const SImg = styled.img`
  width: 14px;
  height: 14px;

  //styleName: label;
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
`;

const Layout = { Horizontal: SLayout, Vertical: SLayout };
const Stepper = Object.assign(Layout, {
  MinusButton,
  PlusButton,
  DisplayCounter,
});

export default Stepper;
