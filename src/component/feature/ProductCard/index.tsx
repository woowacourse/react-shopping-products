import { useState, useEffect } from 'react';
import Button from '../../@common/Button';
import Text from '../../@common/Text';

import {
  productCardButtonContainerStyle,
  productCardContentHeaderStyle,
  productCardContentStyle,
  productCardImageContainerStyle,
  productCardImageStyle,
  productCardStyle,
} from './ProductCard.styles';
import { IconAddCart } from '../../../asset';
import { Product, CartItem } from '../../../types/common';
import CountButton from '../CountButton';
import SoldOutOverlay from '../SoldOutOverlay';

interface ProductCardProps extends Omit<Product, 'category'> {
  isInCart: boolean;
  handleAddCart: (productId: number) => void;
  handleRemoveCart: (cartId: number) => void;
  cartData: CartItem[];
}

const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  quantity,
  isInCart,
  handleAddCart,
  handleRemoveCart,
  cartData,
}: ProductCardProps) => {
  const [showCountButton, setShowCountButton] = useState(isInCart);
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [isSoldOut, setIsSoldOut] = useState(quantity <= 0);

  useEffect(() => {
    const cartItem = cartData.find((item) => item.product.id === id);
    const cartQuantity = cartItem ? cartItem.quantity : 0;
    setCurrentQuantity(cartQuantity);

    const newRemainingStock = quantity - cartQuantity;
    setIsSoldOut(newRemainingStock <= 0);

    if (cartQuantity > 0 && !showCountButton) {
      setShowCountButton(true);
    } else if (cartQuantity === 0 && showCountButton) {
      setShowCountButton(false);
    }
  }, [cartData, id, quantity, showCountButton]);

  const handleCountChange = (count: number) => {
    const prevCount = currentQuantity;

    if (count > prevCount) {
      handleAddCart(id);
    } else if (count < prevCount) {
      handleRemoveCart(id);
    }

    if (count === 0) {
      setShowCountButton(false);
    }
  };

  const handleAddButtonClick = () => {
    setShowCountButton(true);
    handleAddCart(id);
  };

  return (
    <section css={productCardStyle}>
      <div css={productCardImageContainerStyle}>
        <SoldOutOverlay isSoldOut={isSoldOut}>
          <img css={productCardImageStyle} src={imageUrl} alt={name} />
        </SoldOutOverlay>
      </div>
      <div css={productCardContentStyle}>
        <div css={productCardContentHeaderStyle}>
          <Text variant="productName">{name}</Text>
          <Text variant="body">{price.toLocaleString()}원</Text>
        </div>
        <div css={productCardButtonContainerStyle}>
          {showCountButton ? (
            <CountButton
              initialCount={currentQuantity}
              onCountChange={handleCountChange}
            />
          ) : (
            <Button
              variant="default"
              onClick={handleAddButtonClick}
              disabled={isSoldOut}
            >
              <img src={IconAddCart} alt="add cart" />
              {isSoldOut ? '품절' : '담기'}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
