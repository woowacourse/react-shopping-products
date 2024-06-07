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
import { useMutationCartItem } from "@/hooks";

interface ProductProps extends HTMLAttributes<HTMLDivElement> {
  product: ProductItem;
}

const Product = ({ product, ...rest }: ProductProps) => {
  const { postCartItemMutation, patchCartItemMutation } = useMutationCartItem();

  const handlePostClick = () => {
    postCartItemMutation.mutate({ productId: product.id, quantity: 1 });
  };

  return (
    <Wrapper {...rest}>
      <ProductImg src={product.imageUrl}></ProductImg>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.price}</ProductPrice>
        <ProductFooter>
          {product.quantity ? (
            <ProductQuantity quantity={product.quantity} />
          ) : (
            <Button
              theme="black"
              style={{ width: "59px", height: "24px" }}
              onClick={handlePostClick}
            >
              <CartIconSVG />
              <span>담기</span>
            </Button>
          )}
        </ProductFooter>
      </ProductInfo>
    </Wrapper>
  );
};

export default Product;
