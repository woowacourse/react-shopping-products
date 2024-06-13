import styled from '@emotion/styled';

export const AddButton = styled.button`
  display: flex;
  gap: 0.25rem;
  align-items: center;

  width: 3.6875rem;
  height: 1.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;

  background-color: ${(props) => props.theme.color.black};

  ${(props) => props.theme.typography.product.toggleButton};
  color: ${(props) => props.theme.color.white};
`;

export const ButtonImage = styled.img`
  width: 1rem;
  height: 1rem;
`;
