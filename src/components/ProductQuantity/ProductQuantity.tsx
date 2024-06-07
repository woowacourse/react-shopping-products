import { Button } from "@/components";
import { Wrapper } from "./ProductQuantity.style";

const ProductQuantity = () => {
  return (
    <Wrapper>
      <Button theme="white" style={{ width: "24px", height: "24px" }}>
        -
      </Button>
      <span>2</span>
      <Button theme="white" style={{ width: "24px", height: "24px" }}>
        +
      </Button>
    </Wrapper>
  );
};

export default ProductQuantity;
