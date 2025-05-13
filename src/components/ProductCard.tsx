import {
  ProductCardWrapper,
  ProductCardDetailWrapper,
  ProductCardDetailTextWrapper,
  ProductCardName,
  ProductCardPrice
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
  const imageSrc = imageUrl
    ? imageUrl
    : category === "패션잡화"
    ? IMAGE_PATH.DEFAULT_FASHION
    : IMAGE_PATH.DEFAULT_GROCERY;

  return (
    <ProductCardWrapper>
      <img src={imageSrc} alt={name} />
      <ProductCardDetailWrapper>
        <ProductCardDetailTextWrapper>
          <ProductCardName>{name}</ProductCardName>
          <ProductCardPrice>{price.toLocaleString()}원</ProductCardPrice>
        </ProductCardDetailTextWrapper>
        <CartToggleButton isInBascket={isInBascket}/>
      </ProductCardDetailWrapper>
    </ProductCardWrapper>
  );
};

export default ProductCard;
