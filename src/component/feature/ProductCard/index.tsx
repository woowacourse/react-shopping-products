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
import { useToast } from '../../@common/Toast/context';
import { MAX_STOCK } from '../../../constant/product';

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
  isInCart,
  handleAddCart,
  handleRemoveCart,
  cartData,
}: ProductCardProps) => {
  const [remainingStock, setRemainingStock] = useState(MAX_STOCK);
  const [showCountButton, setShowCountButton] = useState(isInCart);
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const { openToast } = useToast();
  const [isSoldOut, setIsSoldOut] = useState(false);

  useEffect(() => {
    const cartItem = cartData.find((item) => item.product.id === id);
    const quantity = cartItem ? cartItem.quantity : 0;
    setCurrentQuantity(quantity);

    const newRemainingStock = MAX_STOCK - quantity;
    setRemainingStock(newRemainingStock);
    setIsSoldOut(newRemainingStock <= 0);

    if (quantity > 0 && !showCountButton) {
      setShowCountButton(true);
    } else if (quantity === 0 && showCountButton) {
      setShowCountButton(false);
    }
  }, [cartData, id, name, showCountButton]);

  const handleCountChange = (count: number) => {
    const prevCount = currentQuantity;

    if (count > prevCount) {
      if (currentQuantity >= MAX_STOCK) {
        openToast(`최대 ${MAX_STOCK}개까지만 담을 수 있습니다.`, false);
        return;
      }

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
          {remainingStock > 0 && (
            <Text variant="description">남은 수량: {remainingStock}개</Text>
          )}
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
