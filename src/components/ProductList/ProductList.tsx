import { HTMLAttributes } from "react";
import { Wrapper } from "./ProductList.style";
import type { ProductItem } from "@/types";
import { Product } from "@/components";

interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
  productList: ProductItem[];
}

const ProductList = ({ productList, ...props }: ProductListProps) => {
  return (
    <Wrapper {...props}>
      {productList.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </Wrapper>
  );
};

export default ProductList;
