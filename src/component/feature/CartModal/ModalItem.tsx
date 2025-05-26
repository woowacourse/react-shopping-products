import { css } from '@emotion/react';

import Text from '../../@common/Text/Text';
import Button from '../../@common/Button/Button';
import CartController from '../CartController/CartController';

import { CartItem } from '../../../types/common';
import {
  modalItemStyle,
  ModalItemImageStyle,
  ModalItemInfoStyle,
  ModalItemInfoHeaderStyle,
} from './style/ModalItem.styles';
import CartContext from '../../../context/cartContext/cartContext';
import { useContext } from 'react';
import { getImageUrl } from '../../../util/getImgUrl';

interface ModalItemProps {
  cartItem: CartItem;
}

const ModalItem = ({ cartItem }: ModalItemProps) => {
  const { patchCart, removeCart } = useContext(CartContext);
  const DEFAULT_IMAGE = './image/default.jpeg';

  const imgUrl = getImageUrl(cartItem.product.imageUrl)
    ? cartItem.product.imageUrl
    : DEFAULT_IMAGE;

  const removeCartItem = () => {
    removeCart(cartItem.id);
  };

  return (
    <div css={modalItemStyle}>
      <div>
        <img
          src={imgUrl}
          alt={cartItem.product.name}
          css={ModalItemImageStyle}
        />
      </div>
      <div css={ModalItemInfoStyle}>
        <div css={ModalItemInfoHeaderStyle}>
          <Text variant="productName">{cartItem.product.name}</Text>
          <Button
            variant="white"
            css={css`
              padding: 0.4rem 0.8rem;
              justify-content: center;
            `}
            onClick={removeCartItem}
          >
            <Text variant="description">삭제</Text>
          </Button>
        </div>
        <Text variant="description">
          {cartItem.product.price.toLocaleString()}원
        </Text>
        <CartController
          quantity={cartItem.quantity}
          cartItemInfo={cartItem}
          patchCartItemQuantity={patchCart}
        />
      </div>
    </div>
  );
};

export default ModalItem;
