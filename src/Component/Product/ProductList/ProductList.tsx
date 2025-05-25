import ProductItem from "../ProductItem/ProductItem";
import { StyledUl } from "./ProductList.styles";

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};
interface ProductListProps {
  productList: Product[];
}

export default function ProductList({ productList }: ProductListProps) {
  return (
    <StyledUl>
      {productList.map((item) => (
        <ProductItem
          key={item.id}
          {...item}
          // updateCartItems={updateCartItems}
          // getMatchCartItem={getMatchCartItem}
          // checkMax={checkMax}
        />
      ))}
    </StyledUl>
  );
}
