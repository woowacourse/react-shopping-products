import { Product } from '../../../types/product';
import { priceFormatter } from '../../../utils/priceFormatter';
import CartButton from '../CartButton';

import * as S from './style';
import * as C from '../../common/commonStyles';

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({
  product: { imageUrl, name, price, id },
}: ProductItemProps) {
  return (
    <S.Container>
      <S.Image src={imageUrl} alt={name} />
      <S.Information>
        <S.Name>{name}</S.Name>
        <C.Price size="small">{priceFormatter(price)}</C.Price>
      </S.Information>

      <CartButton productId={id} />
    </S.Container>
  );
}
