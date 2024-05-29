import useProducts from "../../hooks/useProducts";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { ProductItem } from "../ProductItem/ProductItem";
import { StyledProductList } from "./ProductList.styled";

export const ProductList = () => {
  const { products, isLoading } = useProducts();

  return (
    <StyledProductList>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        products.map((product) => (
          <ProductItem imageUrl={product.imageUrl} name={product.name} price={product.price} />
        ))
      )}
    </StyledProductList>
  );
};
