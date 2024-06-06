import styled from '@emotion/styled';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;

  position: fixed;
  width: inherit;
  height: 4rem;
  align-items: center;
  padding: 0 1.3rem;

  background-color: ${(props) => props.theme.color.black};

  z-index: 100;
`;

export const AppTitle = styled.button`
  border: none;

  background-color: transparent;

  ${(props) => props.theme.typography.header}
  color: ${(props) => props.theme.color.white};

  cursor: pointer;
`;

export const ShoppingCartCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 1rem;
  top: 2rem;
  z-index: 100;

  width: 1.1875rem;
  height: 1.1875rem;
  border-radius: 100%;

  background-color: white;

  color: black;
  font-size: 0.625rem;
  font-weight: 700;
`;
