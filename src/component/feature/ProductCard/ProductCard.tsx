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
import { IconAddCart, IconRemoveCart } from '../../../asset';
import { useContext } from 'react';
import CartContext from '../../../context/cartContext/cartContext';

interface ProductCardProps extends Omit<Product, 'category'> {}

const ProductCard = ({ id, name, price, imageUrl }: ProductCardProps) => {
  const { cartData, addCart, removeCart, patchCart } = useContext(CartContext);

  const productCartId = cartData.find(
    (item: CartItem) => item.product.id === id
  )?.id;

  const productCartQuantity = cartData.find(
    (item: CartItem) => item.product.id === id
  )?.quantity;

  const inCart = cartData.some((item: CartItem) => item.product.id === id);

  const handleClick = async (productId: number) => {
    if (inCart) {
      removeCart(productId);
    } else {
      addCart(productId);
    }
  };

  return (
    <section css={productCardStyle}>
      <div css={productCardImageContainerStyle}>
        <img css={productCardImageStyle} src={imageUrl} alt={name} />
      </div>
      <div css={productCardContentStyle}>
        <div css={productCardContentHeaderStyle}>
          <Text variant="productName">{name}</Text>
          <Text variant="body">{price.toLocaleString()}원</Text>
        </div>
        <div css={productCardButtonContainerStyle}>
          {inCart ? (
            <Button variant="gray" onClick={() => handleClick(id)}>
              <img src={IconRemoveCart} alt="remove cart" />
              빼기
            </Button>
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
