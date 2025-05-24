import ProductItem from "../ProductItem/ProductItem";
import { ProductType } from "../../../types/ProductType";
import { useCartContext } from "../../../domain/contexts/CartContext";
import { StyledUl } from "./ProductList.styles";

interface ProductListProps {
  productList: ProductType[];
}

export default function ProductList({ productList }: ProductListProps) {
  const { updateCartItems, getMatchCartItem, checkMax } = useCartContext();

  return (
    <StyledUl>
      {productList.map((item) => (
        <ProductItem
          key={item.id}
          {...item}
          updateCartItems={updateCartItems}
          getMatchCartItem={getMatchCartItem}
          checkMax={checkMax}
        />
      ))}
    </StyledUl>
  );
}
