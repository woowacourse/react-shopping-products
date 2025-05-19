import styled from "@emotion/styled";
import ProductItem from "./ProductItem";
import { ProductTypes } from "../../types/ProductTypes";
import useCartContext from "../../contexts/CartContext";

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

const StyledUl = styled.ul`
  display: grid;
  list-style-type: none;
  padding: 0;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;
