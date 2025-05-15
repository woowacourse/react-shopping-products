import {
  ProductCardWrapper,
  ProductCardDetailWrapper,
  ProductCardDetailTextWrapper,
  ProductCardName,
  ProductCardPrice,
  ProductImage,
} from "../styles/ProductCard";
import { IMAGE_PATH } from "../constants/imagePath";
import CartToggleButton from "./CartToggleButton";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  isInBascket: boolean;
};

const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  category,
  isInBascket,
}: ProductCardProps) => {

  const defaultSrc = category === "패션잡화"
    ? IMAGE_PATH.DEFAULT_FASHION
    : IMAGE_PATH.DEFAULT_GROCERY;

  const imageSrc = imageUrl
    ? imageUrl
    : defaultSrc

  return (
    <ProductCardWrapper>
        <ProductImage src={imageSrc} alt={name} />
      <ProductCardDetailWrapper>
        <ProductCardDetailTextWrapper>
          <ProductCardName>{name}</ProductCardName>
          <ProductCardPrice>{price.toLocaleString()}원</ProductCardPrice>
        </ProductCardDetailTextWrapper>
        <CartToggleButton id={id} isInBascket={isInBascket} />
      </ProductCardDetailWrapper>
    </ProductCardWrapper>
  );
};

export default ProductCard;
