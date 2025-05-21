import { css } from "@emotion/react";
import Text from "../Text/Text";
import Button from "../Button/Button";

interface PlusMinusButtonProps {
  onAddButtonClick: () => void;
  onMinusButtonClick: () => void;
  quantity: number;
}

export default function PlusMinusButton({ onAddButtonClick, onMinusButtonClick, quantity }: PlusMinusButtonProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Button css={controlButtonStyle} onClick={onMinusButtonClick}>
        <Text css={controlButtonTextStyle} variant="body-0">
          -
        </Text>
      </Button>
      <Text variant="body-2">{quantity}</Text>
      <Button css={controlButtonStyle} onClick={onAddButtonClick}>
        <Text css={controlButtonTextStyle} variant="body-0">
          +
        </Text>
      </Button>
    </div>
  );
}

const controlButtonStyle = css`
  padding: 0;
  border-radius: 8px;
  border: 1.5px solid #e5e5e5;
  width: 20px;
  height: 20px;
  background: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const controlButtonTextStyle = css`
  width: 100%;
  font-size: 24px;
  color: #222;
  text-align: center;
`;
