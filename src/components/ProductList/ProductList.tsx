import { HTMLAttributes } from "react";
import { Wrapper } from "./ProductList.style";

interface ProductListProps extends HTMLAttributes<HTMLDivElement> {}

const ProductList = ({ ...rest }: ProductListProps) => {
  return <Wrapper {...rest}></Wrapper>;
};

export default ProductList;
