import { BorderButton } from '../../common/BorderButton/style';
import QuantityButton from '../../common/QuantityButton';

import { cartMutations } from '../../../hooks/queries/cart';
import type { CartItem, Product } from '../../../types';
import { priceFormatter } from '../../../utils/priceFormatter';

import * as C from '../../common/commonStyles';
import * as S from './style';

interface CartItemProps {
  cartItem: CartItem;
}

export default function CartItem({ cartItem: { id, product } }: CartItemProps) {
  return (
    <S.CartItemWrapper>
      <S.CartItemContainer>
        <CartItem.Image name={product.name} imageUrl={product.imageUrl} />

        <S.CartItemInfo>
          <CartItem.Details name={product.name} price={product.price} />
          <CartItem.QuantityButton productId={product.id} />
        </S.CartItemInfo>
      </S.CartItemContainer>

      <CartItem.DeleteButton cartItemId={id} />
    </S.CartItemWrapper>
  );
}

CartItem.Image = function CartItemImage({
  imageUrl,
  name,
}: Pick<Product, 'imageUrl' | 'name'>) {
  return <S.CartItemImage src={imageUrl} alt={name} />;
};

CartItem.Details = function CartItemDetails({
  name,
  price,
}: Pick<Product, 'name' | 'price'>) {
  return (
    <>
      <S.ProductName>{name}</S.ProductName>
      <C.Price size="small">{priceFormatter(price)}</C.Price>
    </>
  );
};

CartItem.QuantityButton = function CartItemQuantityButton({
  productId,
}: {
  productId: number;
}) {
  return (
    <S.QuantityContainer>
      <QuantityButton productId={productId} />
    </S.QuantityContainer>
  );
};

CartItem.DeleteButton = function CartItemDeleteButton({
  cartItemId,
}: {
  cartItemId: number;
}) {
  const { mutate: deleteCartItem } = cartMutations.useDeleteCartItem({
    cartItemId,
  });

  return (
    <BorderButton size="large" onClick={() => deleteCartItem()}>
      삭제
    </BorderButton>
  );
};
