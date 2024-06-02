import styled from '@emotion/styled';
import { BadgeProps } from '../../../type';

export const BadgeContainer = styled.div<BadgeProps>`
  position: absolute;
  right: 2px;
  bottom: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
  width: 1.9rem;
  height: 1.9rem;
  font-family: Montserrat;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 100%;
`;
