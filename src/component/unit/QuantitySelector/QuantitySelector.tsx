import { selectorContainer } from "./QuantitySelector.style";

interface QuantitySelectorProps {
  imgUrl: string;
}

export function QuantitySelector({ imgUrl }: QuantitySelectorProps) {
  return (
    <button css={selectorContainer("80px")}>
      <img src={imgUrl} />
    </button>
  );
}
