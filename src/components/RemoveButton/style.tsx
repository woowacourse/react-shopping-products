import styled from '@emotion/styled';

export const RemoveButton = styled.button`
  width: 2.5rem;
  height: 1.5rem;
  padding: 0;
  border: 1px solid ${(props) => props.theme.color.borderGray};
  border-radius: 4px;

  ${(props) => props.theme.typography.cartItem.removeButtonLabel};
  color: ${(props) => props.theme.color.darkBlack};

  background-color: ${(props) => props.theme.color.white};

  cursor: pointer;
`;
