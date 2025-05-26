import {
  ProductContainer,
  ProductImage,
  ProductTitle,
  ContentContainer,
  ProductPrice,
  ButtonContainer,
  ImageContainer,
  SoldOutImage,

} from "./ProductCard.css";
import CartToggleButton from "../cartToggleButton/CartToggleButton";

interface ProductCardProps {
  cartInfo: {
    cartId?: number;
    cartAmount: number;
  };
  productInfo: {
    productId: number;
    name: string;
    price: number;
    imageUrl: string;
    isAdded: boolean;
    quantity: number;
  };
}

function ProductCard({ cartInfo, productInfo }: ProductCardProps) {
  const { imageUrl, productId, name, price, isAdded, quantity } = productInfo;
  const { cartId, cartAmount } = cartInfo;
  const isSoldOut = quantity === 0;

  return (
    <div css={ProductContainer}>
      <div css={ImageContainer}>
        {isSoldOut && <div css={SoldOutImage}>품절</div>}
        <img css={ProductImage} src={imageUrl}></img>
      </div>
      <div css={ContentContainer}>
        <h3 css={ProductTitle}>{name}</h3>
        <p css={ProductPrice}>{price.toLocaleString()}원</p>
      </div>
      <div css={ButtonContainer}>
        <CartToggleButton
          isSoldOut={isSoldOut}
          quantity={quantity}
          productId={productId}
          cartId={cartId}
          cartAmount={cartAmount}
          isAdded={isAdded}
        />
      </div>
    </div>
  );
}

export default ProductCard;
