import { Button } from "@/components";
import { Wrapper } from "./ProductQuantity.style";
import { HTMLAttributes } from "react";

interface ProductQuantity extends HTMLAttributes<HTMLDivElement> {
  handleChangeQuantity: (newQuantity: number) => void;
  quantity: number;
}

const ProductQuantity = ({ handleChangeQuantity, quantity }: ProductQuantity) => {
  return (
    <Wrapper>
      <Button
        theme="white"
        style={{ width: "24px", height: "24px" }}
        onClick={() => handleChangeQuantity(quantity - 1)}
      >
        -
      </Button>
      <span>{quantity}</span>
      <Button
        theme="white"
        style={{ width: "24px", height: "24px" }}
        onClick={() => handleChangeQuantity(quantity + 1)}
      >
        +
      </Button>
    </Wrapper>
  );
};

export default ProductQuantity;
