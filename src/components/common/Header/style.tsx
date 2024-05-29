import styled from '@emotion/styled';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 4rem;
  padding: 1rem 1.5rem;

  background-color: ${(props) => props.theme.color.black};
`;
