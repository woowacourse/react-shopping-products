import styled from "styled-components";
import {
  IncreaseIcon,
  IncreaseIconDisabled,
  DecreaseIcon,
  DecreaseIconDisabled,
} from "../../../assets";
import { QuantityControlType } from "./QuantityController";

export const QuantityControllerContainer = styled.div`
  width: 80px;
  height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  color: "#0A0D13";
  font-size: 12px;
  font-weight: 500;
`;

export const QuantityControlButton = styled.button<{ $controlType: QuantityControlType }>`
  width: 24px;
  height: 24px;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  background: url("${(props) => getButtonIconPath(props.$controlType, false)}") no-repeat center;
  cursor: pointer;

  &:disabled {
    background: url("${(props) => getButtonIconPath(props.$controlType, true)}") no-repeat center;
    cursor: default;
  }
`;

const getButtonIconPath = (type: QuantityControlType, isDisabled: boolean) => {
  if (isDisabled) {
    return type === "increase" ? IncreaseIconDisabled : DecreaseIconDisabled;
  }
  return type === "increase" ? IncreaseIcon : DecreaseIcon;
};
