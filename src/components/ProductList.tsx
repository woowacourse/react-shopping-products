import { Product } from '@/types/product.type';
import ProductItem from './ProductItem';
import styled from '@emotion/styled';
import { useState } from 'react';

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  // TODO: id 당으로 변경
  const [isSelected, setIsSelected] = useState<boolean[]>(
    Array(products.length).fill(true)
  );

  return (
    <S.ListContainer>
      {products.map((product, index) => (
        <ProductItem
          key={product.id}
          item={product}
          isSelected={isSelected[index]}
        />
      ))}
    </S.ListContainer>
  );
};

export default ProductList;

const S = {
  ListContainer: styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-grow: 1;
    gap: 20px;
    justify-items: center;
    height: calc(100vh - 200px);
    overflow-y: auto;
    z-index: -1;
    margin-top: 24px;
  `,
};
