import styled from "styled-components";

export const Select = styled.select`
  background-color: white;
  color: black;
  border: 1px solid lightGray;
  border-radius: 8px;
  height: 36px;
  width: 124px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      background-color: return "#333333";
    }
  }

  &:disabled {
    cursor: default;
    background-color: "#aaaaaa";
  }
`;
export const Option = styled.option``;
