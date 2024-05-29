import useProducts from "../../hooks/useProducts";
import { ProductItem } from "../ProductItem/ProductItem";
import { StyledProductList } from "./ProductList.styled";

export const ProductList = () => {
  const { products } = useProducts();

  console.log(products);

  return (
    <StyledProductList>
      {products.map((product) => (
        <ProductItem imageUrl={product.imageUrl} name={product.name} price={product.price} />
      ))}
    </StyledProductList>
  );
};
