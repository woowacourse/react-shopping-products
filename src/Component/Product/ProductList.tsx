import styled from '@emotion/styled';
import ProductItem from './ProductItem';
import { ProductTypes } from '../../types/ProductTypes';

interface ProductListProps {
  productList: ProductTypes[];
  updateCart: (id: number) => void;
  isMatch: (id: number) => boolean;
}

export default function ProductList({
  productList,
  updateCart,
  isMatch,
}: ProductListProps) {
  return (
    <StyledUl>
      {productList.map((props) => (
        <ProductItem {...props} updateCart={updateCart} isMatch={isMatch} />
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
