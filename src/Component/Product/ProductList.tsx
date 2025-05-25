import { StyledUl } from "../../styles/Product/ProductList.styles";
import ProductItem from "./ProductItem";

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
