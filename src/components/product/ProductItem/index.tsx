import { Product } from '../../../types/product';
import AddCartButton from '../AddCartButton';
import * as S from './style';

interface ProductItemProps {
  imageUrl: Product['imageUrl'];
  // description?: Product['description'];
  name: Product['name'];
  price: Product['price'];
}

export default function ProductItem({
  imageUrl,
  // description = '설명',
  name,
  price,
}: ProductItemProps) {
  return (
    <S.Container>
      <S.Image src={imageUrl} alt={name} />
      <S.Information>
        <S.Name>{name}</S.Name>
        {/* <S.Description>{description}</S.Description> */}
        <S.Price>{price}</S.Price>
      </S.Information>

      <AddCartButton />
    </S.Container>
  );
}
