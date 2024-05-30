import styled from '@emotion/styled';

export const HandleCartItemButton = styled.button<{ $isInCart: boolean }>`
  ${(props) => props.theme.typography.buttonLabel}

  width: 3.6875rem;
  height: 1.5rem;
  border-radius: 4px;
  border: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  cursor: pointer;

  background-color: ${(props) =>
    props.$isInCart ? props.theme.color.lightGray : props.theme.color.black};
  color: ${(props) => (props.$isInCart ? props.theme.color.black : 'white')};
`;
