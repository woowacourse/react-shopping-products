import styled from "styled-components";

export const Dropdown = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid lightGray;
  border-radius: 8px;
  height: 36px;
  width: 124px;
  padding: 8px 12px;

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

export const DropdownLabel = styled.label``;

export const ChevronDownIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const Select = styled.select`
  background-color: white;
  color: black;

  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
`;
export const Option = styled.option``;
