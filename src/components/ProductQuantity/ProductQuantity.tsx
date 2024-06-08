import { Button } from "@/components";
import { Wrapper } from "./ProductQuantity.style";
import { HTMLAttributes } from "react";
import { useMutationCartItem } from "@/hooks";

interface ProductQuantity extends HTMLAttributes<HTMLDivElement> {
  quantity: number;
  cartItemId: number;
}

const ProductQuantity = ({ cartItemId, quantity }: ProductQuantity) => {
  const { handleChangeQuantity } = useMutationCartItem();

  return (
    <Wrapper>
      <Button
        theme="white"
        style={{ width: "24px", height: "24px" }}
        onClick={() => handleChangeQuantity(cartItemId, quantity - 1)}
      >
        -
      </Button>
      <span>{quantity}</span>
      <Button
        theme="white"
        style={{ width: "24px", height: "24px" }}
        onClick={() => handleChangeQuantity(cartItemId, quantity + 1)}
      >
        +
      </Button>
    </Wrapper>
  );
};

export default ProductQuantity;
