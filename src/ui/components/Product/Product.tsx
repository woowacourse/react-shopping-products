import AddButton from './AddButton';
import RemoveButton from './RemoveButton';
import {
  Container,
  ProductImageContainer,
  ProductImage,
  Detail,
  Price,
  ProductName, ImageContainer, EmptyImage,
} from './Product.styles';
import { ProductElement } from '../../../types/product';
import { woowaLogo } from "../../../assets";
import { useState } from 'react';

interface ProductProps {
  item: ProductElement;
  onAddCart: (product: ProductElement) => Promise<void>;
  onRemoveCart: (product: ProductElement) => Promise<void>;
}

function Product({ item, onAddCart, onRemoveCart }: ProductProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { product, isInCart } = item;

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
        <RemoveButton onClick={handleRemoveCart} disabled={isLoading} />
      ) : (
        <AddButton onClick={handleAddCart} disabled={isLoading} />
      )}
    </Container>
  );
}

export default Product;
