import { ProductHeader } from "../ProductHeader/ProductHeader";
import { ProductList } from "../ProductList/ProductList";
import { StyledProduct } from "./Product.styled";

export const Product = () => {
  return (
    <StyledProduct>
      <ProductHeader />
      <ProductList/>
    </StyledProduct>
  );
};
