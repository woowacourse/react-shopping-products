import { HTMLAttributes } from "react";
import { Wrapper } from "./ProductList.style";
import type { ProductItem } from "@/types";
import { Product } from "@/components";

interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
  productList: ProductItem[];
}

const ProductList = ({ productList, ...rest }: ProductListProps) => {
  return (
    <Wrapper {...rest}>
      {productList.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </Wrapper>
  );
};

export default ProductList;
