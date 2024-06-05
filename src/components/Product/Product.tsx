import { HTMLAttributes } from "react";
import { Wrapper } from "./Product.style";

interface ProductProps extends HTMLAttributes<HTMLDivElement> {}

const Product = ({ ...rest }: ProductProps) => {
  return <Wrapper {...rest}></Wrapper>;
};

export default Product;
