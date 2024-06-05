import { Butoon } from "@/components";
import { Wrapper } from "./ProductQuantity.style";

const ProductQuantity = () => {
  return (
    <Wrapper>
      <Butoon theme="white" style={{ width: "24px", height: "24px" }}>
        -
      </Butoon>
      <span>2</span>
      <Butoon theme="white" style={{ width: "24px", height: "24px" }}>
        +
      </Butoon>
    </Wrapper>
  );
};

export default ProductQuantity;
