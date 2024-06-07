import { formatKoreanCurrency } from '@utils/currency';

import * as Styled from './ItemDescription.styled';
import { Product } from '@appTypes/product';

export type ItemDescriptionType = React.FC<
  React.PropsWithChildren<Pick<Product, 'name' | 'price'>>
>;

const ItemDescription: ItemDescriptionType = ({ children, name, price }) => {
  return (
    <Styled.ItemDescriptionWrapper>
      <Styled.ItemDescriptionTitle>{name}</Styled.ItemDescriptionTitle>
      <Styled.ItemDescriptionPrice>{formatKoreanCurrency(price)}</Styled.ItemDescriptionPrice>
      <Styled.ItemQuantityWrapper>{children}</Styled.ItemQuantityWrapper>
    </Styled.ItemDescriptionWrapper>
  );
};

export default ItemDescription;
