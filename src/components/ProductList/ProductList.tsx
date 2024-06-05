import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { ProductItem } from "../ProductItem/ProductItem";
import { StyledProductList } from "./ProductList.styled";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  lastProductElementRef: (node: HTMLElement | null) => void;
}

export const ProductList = ({ products, isLoading, lastProductElementRef }: ProductListProps) => {
  return (
    <StyledProductList>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        products.map((product, index) => (
          <div key={product.id}>
            <ProductItem
              id={product.id}
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
            />
            <div ref={products.length === index + 1 ? lastProductElementRef : null}></div>
          </div>
        ))
      )}
    </StyledProductList>
  );
};
