import AddButton from './AddButton';
import Stepper from '../Stepper/Stepper';
import { useState } from 'react';
import {
  Container,
  ProductImageContainer,
  ProductImage,
  Detail,
  Price,
  ProductName,
  StepperContainer,
  SoldOutOverlay,
  SoldOutText,
} from './Product.styles';
import { ProductElement } from '../../../types/product';
import { woowaLogo } from '../../../assets';

interface ProductProps {
  item: ProductElement;
  onAddCart: (product: ProductElement) => Promise<void>;
  onRemoveCart: (product: ProductElement) => Promise<void>;
  onUpdateQuantity?: (cartItemId: number, quantity: number) => Promise<void>;
  cartQuantity?: number;
}

function Product({
  item,
  onAddCart,
  onRemoveCart,
  onUpdateQuantity,
  cartQuantity = 1,
}: ProductProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { product, isInCart, cartId } = item;

  if (!product) {
    return null;
  }

  const isSoldOut = product.quantity !== undefined && product.quantity === 0;

  const handleAddCart = async () => {
    setIsLoading(true);
    try {
      await onAddCart(item);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCart = async () => {
    setIsLoading(true);
    try {
      await onRemoveCart(item);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncreaseQuantity = async () => {
    if (!cartId || !onUpdateQuantity) return;
    setIsLoading(true);
    try {
      await onUpdateQuantity(cartId, cartQuantity + 1);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecreaseQuantity = async () => {
    if (!cartId || !onUpdateQuantity) return;

    if (cartQuantity <= 1) {
      await handleRemoveCart();
    } else {
      setIsLoading(true);
      try {
        await onUpdateQuantity(cartId, cartQuantity - 1);
      } catch (error) {
        console.error('Failed to update quantity:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container>
      <ProductImageContainer>
        <ProductImage
          src={product.imageUrl}
          alt={product.name}
          onError={(e) => {
            const img = e.currentTarget;
            img.onerror = null;
            img.src = woowaLogo;
          }}
        />
        {isSoldOut && (
          <SoldOutOverlay>
            <SoldOutText>SOLDOUT</SoldOutText>
          </SoldOutOverlay>
        )}
      </ProductImageContainer>
      <Detail>
        <ProductName>{product.name}</ProductName>
        <Price>{`${product.price.toLocaleString()}원`}</Price>
      </Detail>
      {isInCart ? (
        <StepperContainer>
          <Stepper
            quantity={cartQuantity}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
            isLoading={isLoading}
          />
        </StepperContainer>
      ) : (
        <AddButton onClick={handleAddCart} disabled={isLoading || isSoldOut} />
      )}
    </Container>
  );
}

export default Product;
