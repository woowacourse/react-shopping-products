import styled from '@emotion/styled';
import ProductItem from './ProductItem';
import { ProductTypes } from '../../types/ProductTypes';

interface ProductListProps {
  productList: ProductTypes[];
  updateCartItems: () => void;
  isMatch: (id: number) => boolean;
}

export default function ProductList({
  productList,
  updateCartItems,
  isMatch,
}: ProductListProps) {
  return (
    <StyledUl>
      {productList.map((props) => (
        <ProductItem
          {...props}
          updateCartItems={updateCartItems}
          isMatch={isMatch}
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
