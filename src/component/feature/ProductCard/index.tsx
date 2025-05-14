import Button from '../../@common/Button';
import Text from '../../@common/Text';

import {
  productCardButtonContainerStyle,
  productCardContentHeaderStyle,
  productCardContentStyle,
  productCardImageContainerStyle,
  productCardImageStyle,
  productCardStyle
} from './ProductCard.styles';
import { Product } from '../../../types/response';
import { useToast } from '../../@common/Toast/context';
import { IconAddCart, IconRemoveCart } from '../../../asset';

interface ProductCardProps extends Omit<Product, 'category'> {
  isInCart: boolean;
  handleAddCart: (productId: number) => void;
  handleRemoveCart: (cartId: number) => void;
}

const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  isInCart,
  handleAddCart,
  handleRemoveCart
}: ProductCardProps) => {
  const { openToast } = useToast();

  const handleClick = async (productId: number) => {
    try {
      if (isInCart) {
        handleRemoveCart(productId);
      } else {
        handleAddCart(productId);
      }
      openToast();
    } catch (error) {
      openToast();
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
          {isInCart ? (
            <Button variant="gray" onClick={() => handleRemoveCart(id)}>
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
