import styled from '@emotion/styled';
import ProductItem from './ProductItem';
import { ProductTypes } from '../../types/ProductTypes';
import { CartItemTypes } from '../../types/CartItemType';

interface ProductListProps {
  productList: ProductTypes[];
  updateCartItems: () => void;
  getMatchCartItem: (id: number) => CartItemTypes | undefined;
  checkMax: () => boolean;
  updateErrorMessage: (errorMessage: string) => void;
}

export default function ProductList({
  productList,
  updateCartItems,
  getMatchCartItem,
  checkMax,
  updateErrorMessage,
}: ProductListProps) {
  return (
    <StyledUl>
      {productList.map((props) => (
        <ProductItem
          {...props}
          id={props.id}
          key={props.id}
          updateCartItems={updateCartItems}
          getMatchCartItem={getMatchCartItem}
          checkMax={checkMax}
          updateErrorMessage={updateErrorMessage}
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
