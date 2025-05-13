import styled from '@emotion/styled';

export const CustomSelect = styled.select`
  width: 125px;
  height: 36px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;

  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;
