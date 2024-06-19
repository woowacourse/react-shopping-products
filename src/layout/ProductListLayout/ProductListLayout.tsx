import { HTMLAttributes } from "react";
import { Wrapper } from "./ProductListLayout.style";

interface ProductListLayoutProps extends HTMLAttributes<HTMLDivElement> {}

const ProductListLayout = ({ ...props }: ProductListLayoutProps) => {
  return <Wrapper {...props}></Wrapper>;
};

export default ProductListLayout;
