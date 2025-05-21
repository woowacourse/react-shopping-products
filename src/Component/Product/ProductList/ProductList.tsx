import ProductItem from "../ProductItem/ProductItem";
import { ProductTypes } from "../../../types/ProductTypes";
import useCartContext from "../../../domain/contexts/useCartContext";
import { StyledUl } from "./ProductList.styles";

interface ProductListProps {
  productList: ProductTypes[];
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
