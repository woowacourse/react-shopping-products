import { useState } from "react";
import { IconButton } from "../IconButton/IconButton";
import { QuantitySelectorLayout } from "./QuantitySelector.style";

export function QuantitySelector() {
  const [count, setCount] = useState(0);

  const handleAddCount = () => {
    setCount((prev) => prev + 1);
  };
  const handleMinusCount = () => {
    if (count > 0) setCount((prev) => prev - 1);
  };
  return (
    <div css={QuantitySelectorLayout}>
      <IconButton imgUrl="./minus.png" onClick={handleMinusCount} />
      <p>{count}</p>
      <IconButton imgUrl="./plus.png" onClick={handleAddCount} />
    </div>
  );
}
