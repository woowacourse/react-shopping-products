import { HTMLAttributes } from "react";
import { Wrapper } from "./ProductListLayout.style";

interface ProductListLayoutProps extends HTMLAttributes<HTMLDivElement> {}

const ProductListLayout = ({ ...rest }: ProductListLayoutProps) => {
  return <Wrapper {...rest}></Wrapper>;
};

export default ProductListLayout;
