import styled from "@emotion/styled";

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  font-size: 10.629px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.615px;
`;

export const Label = styled.label<{ isOpen: boolean }>`
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  width: 100%;
  border: solid 1.01px ${({ isOpen }) => (isOpen ? "#000000" : "#acacac")};
  border-radius: 8px;
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  color: #000000;
  font-size: 10.629px;
`;

export const OptionList = styled.ul`
  position: absolute;
  width: 100%;
  top: 40px;
  left: 0;
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 5.315px;
  border: 1px solid #acacac;
  background: #fff;
  z-index: 10;
  box-sizing: border-box;
`;

export const OptionItem = styled.li`
  color: #4f4f4f;
  padding: 8px 10px;
  cursor: pointer;
  border-radius: 5.315px;

  &:hover {
    background: #e9e9e9;
  }
`;
