import styled from '@emotion/styled';

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 3rem;
  background-color: #000000;
  width: 100%;
  height: 6.4rem;
`;
interface HeaderIconProps {
  $width: string;
}

export const HeaderIcon = styled.img<HeaderIconProps>`
  width: ${(props) => props.$width};
  aspect-ratio: 1;
`;
