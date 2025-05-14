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
  productId: number;
  cartId?: number;
  isAdded: boolean;
  name: string;
  price: number;
  imageUrl: string;
  setCartItemIds: React.Dispatch<
    React.SetStateAction<Record<"productId" | "cartId", number>[]>
  >;
}

function ProductCard({
  productId,
  cartId,
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
          productId={productId}
          cartId={cartId}
          isAdded={isAdded}
          setCartItemIds={setCartItemIds}
        />
      </div>
    </div>
  );
}

export default ProductCard;
