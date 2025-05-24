import { css } from "@emotion/react";

const DropDownIcon = css`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 16px;
`;

const DropDownOptions = css`
  font-family: Inter;
  font-weight: 400;
  font-size: 10.63px;
  color: #4f4f4f;
  padding: 8px;

  &:hover,
  &:focus {
    background-color: #f3f3f3;
    cursor: pointer;
    outline: none;
  }
`;

const DropDownDefault = (isOpen: boolean) => {
  const borderColor = isOpen ? "#000" : "#acacac";
  const color = "#000";

  return css`
    display: flex;
    background-color: white;
    padding: 10px;
    width: 100%;
    border: 1px solid #acacac;
    border-color: ${borderColor};
    color: ${color};
    box-sizing: border-box;
    border-radius: 4px;
    font-family: Inter;
    font-weight: 400;
    font-size: 10px;
  `;
};

const DropDownContainer = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  top: 36px;
  border: 1px solid #acacac;
  border-radius: 5px;
  background-color: white;
  list-style-type: none;
`;

const SelectorContainer = css`
  position: relative;
`;

export {
  DropDownIcon,
  DropDownOptions,
  DropDownDefault,
  DropDownContainer,
  SelectorContainer,
};
