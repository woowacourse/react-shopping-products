import { HTMLAttributes } from "react";
import { Wrapper } from "./ProductList.style";

interface ProductListProps extends HTMLAttributes<HTMLDivElement> {}

const ProductList = ({ ...rest }: ProductListProps) => {
  return <Wrapper {...rest}>ProductList</Wrapper>;
};

export default ProductList;
