import styled from '@emotion/styled';
import ProductItem from './ProductItem';

type ProductList = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  isItemInCart: boolean;
};

interface ProductListProps {
  productList: ProductList[];
}

export default function ProductList({ productList }: ProductListProps) {
  return (
    <StyledUl>
      {productList.map((props) => (
        <ProductItem {...props} />
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
