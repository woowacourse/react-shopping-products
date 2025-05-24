import {css} from '@emotion/react';
import styled from '@emotion/styled';

type Position = {$position: 'center' | 'bottom'};

type TitleStyledProps = {
  $color?: string;
  $size?: number;
};

export const Backdrop = styled.div<Position>`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: ${({$position}) => ($position === 'center' ? 'center' : 'end')};
  background-color: rgba(0, 0, 0, 0.3);
  inset: 0;
`;

export const ModalContainer = styled.div<Position>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  background-color: #fff;
  color: #000;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  ${({$position}) =>
    $position === 'bottom' &&
    css`
      width: 100%;
      border-radius: 10px 10px 0 0;
    `}
`;

export const TopWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const Title = styled.h1<TitleStyledProps>`
  margin: 0;
  color: ${({$color}) => $color ?? '#000'};
  font-size: ${({$size}) => ($size ? `${$size}px` : '24px')};
  font-weight: 700;
`;
