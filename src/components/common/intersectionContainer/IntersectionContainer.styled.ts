import styled from '@emotion/styled';

export const ScrollUpButton = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 10px;
  right: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.color.gray};
  border-radius: 50%;

  background-color: ${(props) => props.theme.color.white};

  font-size: 16px;

  cursor: pointer;
`;
