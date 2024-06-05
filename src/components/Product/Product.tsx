import { HTMLAttributes } from "react";
import {
  Wrapper,
  ProductImg,
  ProductName,
  ProductPrice,
  ProductFooter,
  ProductInfo,
} from "./Product.style";
import { ProductItem } from "@/types";
import { CartIconSVG } from "@/assets/svg";
import { Button, ProductQuantity } from "@/components";

interface ProductProps extends HTMLAttributes<HTMLDivElement> {
  product: ProductItem;
}

const Product = ({ product, ...rest }: ProductProps) => {
  return (
    <Wrapper {...rest}>
      <ProductImg src={product.imageUrl}></ProductImg>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.price}</ProductPrice>
        <ProductFooter>
          {/* <Button theme="black" style={{ width: "59px", height: "24px" }}>
            <CartIconSVG />
            <span>담기</span>
          </Button> */}
          {<ProductQuantity />}
        </ProductFooter>
      </ProductInfo>
    </Wrapper>
  );
};

export default Product;
