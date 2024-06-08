import styled from 'styled-components';
import { ImageBoxProps } from '../ImageBox/ImageBox';

const ContainerWithRatio = styled.div<ImageBoxProps & { ratio: number }>`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: ${({ ratio }) => ratio || 56}%;
  overflow: hidden;
`;

const Image = styled.img<{
  isLoading: boolean;
  border?: string;
  radius?: 's' | 'm' | 'l' | 'none' | number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  background-color: ${({ isLoading, theme }) => (isLoading ? theme.gray : 'transparent')};
  border: ${({ border }) => border || 'none'};
  border-radius: ${({ radius }) => radius || 0}px;
`;

export const StyledRatioImageBox = {
  ContainerWithRatio,
  Image,
};
