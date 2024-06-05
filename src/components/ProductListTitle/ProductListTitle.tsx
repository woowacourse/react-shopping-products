import { HTMLAttributes } from "react";
import { Wrapper } from "./ProductListTitle.style";

interface ProductListTitleProps extends HTMLAttributes<HTMLDivElement> {}

const ProductListTitle = ({ ...rest }: ProductListTitleProps) => {
  return <Wrapper {...rest}></Wrapper>;
};

export default ProductListTitle;
