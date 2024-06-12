import styled, { css } from 'styled-components';

import { ButtonProps } from './Button';

const getColorStyles = (color?: string) => {
  switch (color) {
    case 'primary':
      return css`
        background-color: black;
        color: white;
      `;
    case 'secondary':
      return css`
        background-color: lightGrey;
        color: black;
      `;
    default:
      return css`
        background-color: white;
        color: black;
        border: 1px solid lightGray;
      `;
  }
};

const getSizeStyles = (size?: string, square?: boolean) => {
  switch (size) {
    case 's':
      return css`
        height: 24px;
        padding: ${square ? '4px 4px' : '4px 8px'};
      `;
    case 'l':
      return css`
        height: 48px;
        padding: ${square ? '12px 12px' : '12px 16px'};
      `;
    case 'fit':
      return css`
        height: fit-content;
        padding: 16px 16px;
      `;
    default:
      return css`
        height: 36px;
        padding: ${square ? '8px 8px' : '8px 12px'};
      `;
  }
};

const getWidthStyles = (width?: string | number) => {
  switch (width) {
    case 'fit':
      return 'width: fit-content;';
    case 'full':
      return 'width: 100%;';
    default:
      return `width: ${width}px;`;
  }
};

const getHeightStyles = (height?: string | number) => {
  switch (height) {
    case 'fit':
      return 'height: fit-content;';
    case 'full':
      return 'height: 100%;';
    default:
      return `height: ${height}px;`;
  }
};

const getRadiusStyles = (radius?: string | number) => {
  switch (radius) {
    case 's':
      return 'border-radius: 4px';
    case 'm':
      return 'border-radius: 8px';
    case 'l':
      return 'border-radius: 16px';
    default:
      return `border-radius: ${radius}px`;
  }
};

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;

  ${({ color }) => getColorStyles(color)}
  ${({ size, square }) => getSizeStyles(size, square)}
  ${({ square }) => square && 'aspect-ratio: 1 / 1;'}
  ${({ width }) => getWidthStyles(width)}
  ${({ height }) => getHeightStyles(height)}
  ${({ radius }) => getRadiusStyles(radius)};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      background-color: ${({ color }) =>
        color === 'default' ? '#f5f5f5' : '#555555'};
    }
  }

  &:disabled {
    cursor: default;
    background-color: ${({ color }) =>
      color === 'default' ? '#dddddd' : '#aaaaaa'};
  }
`;
