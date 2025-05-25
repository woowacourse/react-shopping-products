import AddButton from './AddButton';
import {
  Container,
  ProductImageContainer,
  ProductImage,
  Detail,
  Price,
  ProductName, ImageContainer, EmptyImage,
  StepperContainer,
  StepperButton,
  StepperQuantity,
} from './Product.styles';
import { ProductElement } from '../../../types/product';
import { woowaLogo } from "../../../assets";
import { useState } from 'react';

interface ProductProps {
  item: ProductElement;
  onAddCart: (product: ProductElement) => Promise<void>;
  onRemoveCart: (product: ProductElement) => Promise<void>;
  onUpdateQuantity?: (cartItemId: number, quantity: number) => Promise<void>;
  cartQuantity?: number;
}

function Product({ item, onAddCart, onRemoveCart, onUpdateQuantity, cartQuantity = 1 }: ProductProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { product, isInCart, cartId } = item;

  if (!product) {
    return null;
  }

  const isImage = product.imageUrl.length > 15;

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
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container>
      <ProductImageContainer>
        {isImage ?
          <ProductImage
            src={product.imageUrl}
            alt={product.name}
            onError={e => {
              const img = e.currentTarget;
              img.onerror = null;
              img.src = woowaLogo;
            }}
          />
          : (
            <ImageContainer>
              <EmptyImage src={woowaLogo} alt={product.name}/>
              <p>이미지가 없습니다</p>
            </ImageContainer>
          )
        }
      </ProductImageContainer>
      <Detail>
        <ProductName>{product.name}</ProductName>
        <Price>{`${product.price.toLocaleString()}원`}</Price>
      </Detail>
      {isInCart ? (
        <StepperContainer>
          <StepperButton onClick={handleDecreaseQuantity} disabled={isLoading}>
            −
          </StepperButton>
          <StepperQuantity>{cartQuantity}</StepperQuantity>
          <StepperButton onClick={handleIncreaseQuantity} disabled={isLoading}>
            +
          </StepperButton>
        </StepperContainer>
      ) : (
        <AddButton onClick={handleAddCart} disabled={isLoading} />
      )}
    </Container>
  );
}

export default Product;
