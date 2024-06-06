import React, { createContext, useContext } from 'react';
import RoundButton from './RoundButton';
import styled from 'styled-components';
import { PlusSign, MinusSign } from '../../../../assets';

import useCounter from './useCounter';

interface StepperBaseProps {
  children: React.ReactNode;
  counterState: ReturnType<typeof useCounter>;
}
const StepperBase = ({ children, counterState }: StepperBaseProps) => {
  return (
    <StepperContext.Provider value={counterState}>
      {children}
    </StepperContext.Provider>
  );
};

const StepperContext = createContext<ReturnType<typeof useCounter>>({
  counter: 0,
  setCounter: () => {},
  increase: () => {},
  decrease: () => {},
});

const PlusButton = () => {
  const { increase } = useContext(StepperContext);
  return <RoundButtonWithImg imgSrc={PlusSign} onClick={increase} />;
};

const MinusButton = () => {
  const { decrease } = useContext(StepperContext);
  return <RoundButtonWithImg imgSrc={MinusSign} onClick={decrease} />;
};

const DisplayCounter = () => {
  const { counter } = useContext(StepperContext);
  return (
    <SFlexDiv $width={40} $height={32}>
      {counter}
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
const Stepper = Object.assign(StepperBase, {
  Layout,
  MinusButton,
  PlusButton,
  DisplayCounter,
});

export default Stepper;
