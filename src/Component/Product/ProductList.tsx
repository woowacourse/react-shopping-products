import styled from '@emotion/styled';
import ProductItem from './ProductItem';
import { ProductTypes } from '../../types/ProductTypes';
import { CartItemTypes } from '../../types/CartItemType';

interface ProductListProps {
  productList: ProductTypes[];
  updateCartItems: () => void;
  getMatchCartItem: (id: number) => CartItemTypes | undefined;
}

export default function ProductList({
  productList,
  updateCartItems,
  getMatchCartItem,
}: ProductListProps) {
  return (
    <StyledUl>
      {productList.map((props) => (
        <ProductItem
          {...props}
          updateCartItems={updateCartItems}
          getMatchCartItem={getMatchCartItem}
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
