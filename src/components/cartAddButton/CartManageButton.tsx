import { Button, Container, Text } from "./CartManageButton.css";

interface CartManageButtonProps {
  quantity: number;
  increase: () => void;
  decrease: () => void;
}

export default function CartManageButton({
  quantity,
  increase,
  decrease,
}: CartManageButtonProps) {
  return (
    <div css={Container}>
      <button css={Button} onClick={decrease}>
        -
      </button>
      <p css={Text}>{quantity}</p>
      <button css={Button} onClick={increase}>
        +
      </button>
    </div>
  );
}
