import { HTMLAttributes } from "react";
import { Wrapper } from "./ProductListTitle.style";

interface ProductListTitleProps extends HTMLAttributes<HTMLDivElement> {}

const ProductListTitle = ({ ...props }: ProductListTitleProps) => {
  return <Wrapper {...props}>bpple 상품 목록</Wrapper>;
};

export default ProductListTitle;
