import styled from '@emotion/styled';
import { ProductTypes } from '../../types/ProductTypes';
import ProductListItem from './ProductListItem';

interface ProductListProps {
  productList: ProductTypes[];
  updateErrorMessage: (errorMessage: string) => void;
}

export default function ProductList({
  productList,
  updateErrorMessage,
}: ProductListProps) {
  return (
    <StyledUl>
      {productList.map((props) => (
        <ProductListItem
          {...props}
          id={props.id}
          key={props.id}
          isRow={false}
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
