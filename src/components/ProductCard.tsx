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
};

const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  category,
}: ProductCardProps) => {

  const defaultSrc = category === "패션잡화"
    ? IMAGE_PATH.DEFAULT_FASHION
    : IMAGE_PATH.DEFAULT_GROCERY;

  const imageSrc = imageUrl
    ? imageUrl
    : defaultSrc
    
  const isInBascket = true; // 추후 API 요청 예정

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
