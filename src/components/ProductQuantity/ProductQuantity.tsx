import { Button } from "@/components";
import { Wrapper } from "./ProductQuantity.style";
import { HTMLAttributes } from "react";

interface ProductQuantity extends HTMLAttributes<HTMLDivElement> {
  quantity: number;
}

const ProductQuantity = ({ quantity }: ProductQuantity) => {
  return (
    <Wrapper>
      <Button theme="white" style={{ width: "24px", height: "24px" }}>
        -
      </Button>
      <span>{quantity}</span>
      <Button theme="white" style={{ width: "24px", height: "24px" }}>
        +
      </Button>
    </Wrapper>
  );
};

export default ProductQuantity;
