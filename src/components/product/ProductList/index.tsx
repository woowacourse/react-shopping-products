import { Product } from '../../../types/product';
import ProductItem from '../ProductItem';

import * as S from './style';

interface ProductListProps {
  items: Product[];
}

export default function ProductList({ items }: ProductListProps) {
  return (
    <S.Container>
      {items.map(({ imageUrl, name, price }) => (
        <ProductItem imageUrl={imageUrl} name={name} price={price} />
      ))}
    </S.Container>
  );
}
