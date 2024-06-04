import styled from '@emotion/styled';

export const DropdownContainer = styled.ul`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.select`
  background-color: #ffffff;
  color: #000000;
  padding: 10px 20px;
  border: 1px solid gray;
  border-radius: 4px;
  cursor: pointer;
`;

export const DropdownItem = styled.option`
  padding: 12px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;
