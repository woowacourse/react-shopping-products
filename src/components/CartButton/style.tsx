import styled from '@emotion/styled';

export const CartButton = styled.button`
  position: relative;

  width: 2rem;
  height: 2rem;
`;

export const NumberOfCartItems = styled.span`
  ${(props) => props.theme.typography.cartLabel};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  width: 1.1875rem;
  height: 1.1875rem;
  border-radius: 50%;

  background-color: ${(props) => props.theme.color.white};

  transform: translate(40%, 50%);
`;
