import React from 'react';
import RoundButton from './RoundDesign';
import styled from 'styled-components';
import { PlusSign } from '../../../../assets';

const Stepper = () => {
  return (
    <div>
      <RoundButton
        width={28}
        height={28}
        onClick={() => {
          console.log('클릭 +');
        }}
      >
        <SDiv>
          <SImg src={PlusSign}></SImg>
        </SDiv>
      </RoundButton>
    </div>
  );
};
const SDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

export default Stepper;
