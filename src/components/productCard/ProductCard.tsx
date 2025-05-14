import {
  ProductContainer,
  ProductImage,
  ProductTitle,
  ContentContainer,
  ProductPrice,
  ButtonContainer,
} from "./ProductCard.css";
import CartToggleButton from "./CartToggleButton";

interface ProductCardProps {
  isAdded: boolean;
  category: string;
  name: string;
  price: number;
  imageUrl: string;
}

function ProductCard({
  category,
  name,
  price,
  imageUrl,
  isAdded,
}: ProductCardProps) {
  return (
    <div css={ProductContainer}>
      <img css={ProductImage} src={imageUrl}></img>
      <div css={ContentContainer}>
        <h3 css={ProductTitle}>{name}</h3>
        <p css={ProductPrice}>{price.toLocaleString()}원</p>
      </div>
      <div css={ButtonContainer}>
        <CartToggleButton isAdded={isAdded} />
      </div>
    </div>
  );
}

export default ProductCard;
