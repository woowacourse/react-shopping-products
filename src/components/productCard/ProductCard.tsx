import {
  ProductContainer,
  ProductImage,
  ProductTitle,
  ContentContainer,
  ProductPrice,
  ButtonContainer,
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
  };
  setCartItemIds: React.Dispatch<
    React.SetStateAction<Record<"productId" | "cartId", number>[]>
  >;
  fetchCartProducts: () => void;
}

function ProductCard({
  cartInfo,
  productInfo,
  setCartItemIds,
  fetchCartProducts,
}: ProductCardProps) {
  const { imageUrl, productId, name, price, isAdded } = productInfo;
  const { cartId, cartAmount } = cartInfo;
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
          cartAmount={cartAmount}
          isAdded={isAdded}
          setCartItemIds={setCartItemIds}
          fetchCartProducts={fetchCartProducts}
        />
      </div>
    </div>
  );
}

export default ProductCard;
