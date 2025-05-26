import Button from '../../@common/Button/Button';
import Text from '../../@common/Text/Text';

import {
  productCardButtonContainerStyle,
  productCardContentHeaderStyle,
  productCardContentStyle,
  productCardImageContainerStyle,
  productCardImageStyle,
  productCardSoldOutStyle,
  productCardStyle,
} from './ProductCard.styles';
import { CartItem, Product } from '../../../types/common';
import { IconAddCart } from '../../../asset';
import { useContext } from 'react';
import CartContext from '../../../context/cartContext/cartContext';
import CartController from '../CartController/CartController';
import { getImageUrl } from '../../../util/getImgUrl';

interface ProductCardProps extends Omit<Product, 'category'> {}

const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  quantity,
}: ProductCardProps) => {
  const { cartData, addCart, patchCart } = useContext(CartContext);

  const newImageUrl = getImageUrl(imageUrl) ? imageUrl : './image/default.jpeg';

  const productCartInfo = cartData.find(
    (item: CartItem) => item.product.id === id
  );

  const productCartQuantity = productCartInfo?.quantity;

  const inCart = cartData.some((item: CartItem) => item.product.id === id);

  const handleClick = async (productId: number) => {
    addCart(productId);
  };

  return (
    <section css={productCardStyle}>
      <div css={productCardImageContainerStyle}>
        {quantity === 0 && (
          <div css={productCardSoldOutStyle}>
            <Text variant="title">품절</Text>
          </div>
        )}
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
              cartItemInfo={productCartInfo!}
              patchCartItemQuantity={patchCart}
            />
          ) : (
            <Button
              variant={quantity === 0 ? 'gray' : 'default'}
              onClick={() => handleClick(id)}
              disabled={quantity === 0}
            >
              <img src={IconAddCart} alt="add cart" />
              {quantity === 0 ? '품절' : '담기'}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
