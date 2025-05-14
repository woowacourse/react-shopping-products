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
import { Product } from '../../../types/response';
import { useToast } from '../../@common/Toast/context';

interface ProductCardProps extends Omit<Product, 'id' | 'category'> {}

const ProductCard = ({ name, price, imageUrl }: ProductCardProps) => {
  const { openToast } = useToast();

  try {
    // const response = await fetch(
    //   `${import.meta.env.VITE_API_BASE_URL}/cart-items`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Basic ${import.meta.env.VITE_API_KEY}`
    //     }
    //   }
    // );
  } catch (error) {
    console.error(error);
  }

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
          <Button variant="default" onClick={openToast}>
            담기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
