import {
  ProductContainer,
  ProductImage,
  ProductTitle,
  ContentContainer,
  ProductPrice,
  ButtonContainer,
} from "./ProductCard.css";
import CartToggleButton from "../cartToggleButton/CartToggleButton";
import { ERROR_TYPE } from "../../hooks/useError";

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
  setErrorTrue: (type: ERROR_TYPE) => void;
  syncCartWithServer: () => void;
}

function ProductCard({
  cartInfo,
  productInfo,
  setCartItemIds,
  setErrorTrue,
  syncCartWithServer,
}: ProductCardProps) {
  const { imageUrl, productId, name, price, isAdded } = productInfo;
  const { cartId, cartAmount } = cartInfo;
  console.log(imageUrl);

  return (
    <div css={ProductContainer}>
      <img
        css={ProductImage}
        src={imageUrl || "/fallBack.png"}
        alt="상품 이미지"
        onError={(e) => {
          e.currentTarget.src = "/fallBack.png";
        }}
      />
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
          setErrorTrue={setErrorTrue}
          syncCartWithServer={syncCartWithServer}
        />
      </div>
    </div>
  );
}

export default ProductCard;
