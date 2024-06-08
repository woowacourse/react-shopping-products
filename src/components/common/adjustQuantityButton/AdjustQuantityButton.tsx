import { ReactNode } from 'react';
import * as Styled from './AdjustQuantityButton.styled';
import { IMAGES } from '@/assets';

interface CartItemQuantityProp {
  id?: number;
  children?: ReactNode;
  handlePlusButton: () => void;
  handleMinusButton: () => void;
}

export const CartItemQuantity = ({
  children,
  handlePlusButton,
  handleMinusButton,
}: CartItemQuantityProp) => {
  return (
    <>
      <Styled.Button onClick={() => handleMinusButton()}>
        <img src={IMAGES.MINUS_BUTTON} alt="-"></img>
      </Styled.Button>
      {children}
      <Styled.Button onClick={() => handlePlusButton()}>
        <img src={IMAGES.PLUS_BUTTON} alt="+"></img>
      </Styled.Button>
    </>
  );
};
