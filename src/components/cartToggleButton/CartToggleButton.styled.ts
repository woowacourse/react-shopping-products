import styled from '@emotion/styled';

interface ButtonMapperProp {
  $isDisabled: boolean;
}

const buttonMapper = ({ $isDisabled }: ButtonMapperProp) => {
  if ($isDisabled) {
    return { opacity: 0.6, cursor: 'auto' };
  }

  return { opacity: 1, cursor: 'pointer' };
};

export const HandleCartItemButton = styled.button<{ $isDisabled: boolean }>`
  ${(props) => props.theme.typography.buttonLabel}

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 4rem;
  height: 1.5rem;
  border: 0;
  border-radius: 0.25rem;
  padding: 0 10px;

  background-color: black;
  color: white;
  ${({ $isDisabled }) => buttonMapper({ $isDisabled })}

  cursor: pointer;
`;
