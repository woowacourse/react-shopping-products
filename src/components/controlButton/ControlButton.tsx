import {
  ControlButtonContainer,
  CountControlButton,
} from "./ControlButton.css";

interface ControlButtonProps {
  handleMinus: () => Promise<void>;
  handlePlus: () => Promise<void>;
  quantity?: number;
}

function ControlButton({
  handleMinus,
  handlePlus,
  quantity,
}: ControlButtonProps) {
  return (
    <div css={ControlButtonContainer}>
      <button css={CountControlButton} onClick={handleMinus}>
        -
      </button>
      <p>{quantity}</p>
      <button css={CountControlButton} onClick={handlePlus}>
        +
      </button>
    </div>
  );
}
export default ControlButton;
