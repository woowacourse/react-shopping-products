import {
  ProductCardWrapper,
  ProductCardDetailWrapper,
  ProductCardDetailTextWrapper,
  ProductCardName,
  ProductCardPrice,
  ProductImage,
} from '../styles/ProductCard';
import { IMAGE_PATH } from '../constants/imagePath';
import CartToggleButton from './CartToggleButton';
import { CartProductIds } from '../hooks/useFetchCartItems';

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  cartProductsIds: CartProductIds[];
  addToCart: (productId: number) => Promise<void>;
  removeFromCart: (cartId: number) => Promise<void>;
};

const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  category,
  cartProductsIds,
  addToCart,
  removeFromCart,
}: ProductCardProps) => {
  const defaultSrc =
    category === '패션잡화' ? IMAGE_PATH.DEFAULT_FASHION : IMAGE_PATH.DEFAULT_GROCERY;

  const imageSrc = imageUrl ? imageUrl : defaultSrc;

  return (
    <ProductCardWrapper>
      <ProductImage
        src={imageSrc}
        alt={name}
        onError={(e) => {
          const target = e.currentTarget;
          target.src = defaultSrc;
        }}
      />
      <ProductCardDetailWrapper>
        <ProductCardDetailTextWrapper>
          <ProductCardName>{name}</ProductCardName>
          <ProductCardPrice>{price.toLocaleString()}원</ProductCardPrice>
        </ProductCardDetailTextWrapper>
        <CartToggleButton
          id={id}
          cartProductsIds={cartProductsIds}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      </ProductCardDetailWrapper>
    </ProductCardWrapper>
  );
};

export default ProductCard;
