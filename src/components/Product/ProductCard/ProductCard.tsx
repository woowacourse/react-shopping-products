import CartButton from "../../CartButton/CartButton";
import Spinner from "../../Spinner/Spinner";
import * as styles from "./ProductCard.style";
import { useState } from "react";

interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  refetchCart: () => Promise<void>;
  isItemInCart: boolean;
  productId: number;
  cartItemId?: number;
}

function ProductCard({
  title,
  price,
  imageUrl,
  isItemInCart,
  refetchCart,
  productId,
  cartItemId,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <li css={styles.cardCss}>
      {!isLoaded && <Spinner size={"large"} />}
      <img
        css={styles.imageCss}
        src={
          imageUrl === null || imageError
            ? "/assets/fallback_image.png"
            : imageUrl
        }
        alt={`${title}상품`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setImageError(true)}
      />
      <div css={styles.detailCss}>
        <h2>{title}</h2>
        <p>{`${price.toLocaleString()}원`}</p>
        <CartButton
          productId={productId}
          refetchCart={refetchCart}
          isInCart={isItemInCart}
          cartItemId={cartItemId}
        />
      </div>
    </li>
  );
}

export default ProductCard;
