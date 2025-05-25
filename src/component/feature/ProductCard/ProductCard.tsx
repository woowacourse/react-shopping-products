import Button from '../../@common/Button/Button';
import Text from '../../@common/Text/Text';

import {
  productCardButtonContainerStyle,
  productCardContentHeaderStyle,
  productCardContentStyle,
  productCardImageContainerStyle,
  productCardImageStyle,
  productCardStyle,
} from './ProductCard.styles';
import { CartItem, Product } from '../../../types/common';
import { IconAddCart } from '../../../asset';
import { useContext } from 'react';
import CartContext from '../../../context/cartContext/cartContext';
import CartController from '../CartController/CartController';
import { getImageUrl } from '../../../util/getImgUrl';

interface ProductCardProps extends Omit<Product, 'category'> {}

const ProductCard = ({ id, name, price, imageUrl }: ProductCardProps) => {
  const { cartData, addCart, patchCart } = useContext(CartContext);

  const newImageUrl = getImageUrl(imageUrl) ? imageUrl : './image/default.jpeg';

  const productCartId = cartData.find(
    (item: CartItem) => item.product.id === id
  )?.id;

  const productCartQuantity = cartData.find(
    (item: CartItem) => item.product.id === id
  )?.quantity;

  const inCart = cartData.some((item: CartItem) => item.product.id === id);

  const handleClick = async (productId: number) => {
    addCart(productId);
  };

  return (
    <section css={productCardStyle}>
      <div css={productCardImageContainerStyle}>
        <img css={productCardImageStyle} src={newImageUrl} alt={name} />
      </div>
      <div css={productCardContentStyle}>
        <div css={productCardContentHeaderStyle}>
          <Text variant="productName">{name}</Text>
          <Text variant="body">{price.toLocaleString()}원</Text>
        </div>
        <div css={productCardButtonContainerStyle}>
          {inCart ? (
            <CartController
              quantity={productCartQuantity ?? 0}
              cartItemId={productCartId ?? 0}
              patchCartItemQuantity={patchCart}
            />
          ) : (
            <Button variant="default" onClick={() => handleClick(id)}>
              <img src={IconAddCart} alt="add cart" />
              담기
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
