import styled from '@emotion/styled';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;

  position: fixed;
  width: 24.3rem;
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
  width: 19px;
  height: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  z-index: 100;
  color: black;
  background-color: white;
  font-size: 10px;
  font-weight: 700;

  position: absolute;
  right: 1rem;
  top: 32px;
`;
