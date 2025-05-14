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
  id: number;
  isAdded: boolean;
  name: string;
  price: number;
  imageUrl: string;
  setCartItemIds: React.Dispatch<React.SetStateAction<number[]>>;
}

function ProductCard({
  id,
  name,
  price,
  imageUrl,
  isAdded,
  setCartItemIds,
}: ProductCardProps) {
  return (
    <div css={ProductContainer}>
      <img css={ProductImage} src={imageUrl}></img>
      <div css={ContentContainer}>
        <h3 css={ProductTitle}>{name}</h3>
        <p css={ProductPrice}>{price.toLocaleString()}원</p>
      </div>
      <div css={ButtonContainer}>
        <CartToggleButton
          id={id}
          isAdded={isAdded}
          setCartItemIds={setCartItemIds}
        />
      </div>
    </div>
  );
}

export default ProductCard;
