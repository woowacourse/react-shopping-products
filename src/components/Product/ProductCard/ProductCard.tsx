import CartButton from "../../CartButton/CartButton";
import Spinner from "../../Spinner/Spinner";
import * as styles from "./ProductCard.style";
import { useState, useMemo } from "react";

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

  // 배포 환경에 따른 베이스 경로 계산
  const basePath = useMemo(() => {
    // GitHub Pages 환경인지 확인
    const isGitHubPages = window.location.hostname.includes("github.io");
    return isGitHubPages ? "/react-shopping-products/" : "";
  }, []);

  // 이미지 URL이 유효한지 확인하는 함수
  const isValidImageUrl = (url: string | null): boolean => {
    if (!url) return false;
    // 올바른 URL 형식인지 확인 (https:// 또는 http://로 시작하는지)
    return url.startsWith("http://") || url.startsWith("https://");
  };

  // Fallback 이미지 경로
  const fallbackImagePath = `${basePath}assets/fallback_image.png`;

  return (
    <li css={styles.cardCss}>
      {!isLoaded && <Spinner size={"large"} />}
      <img
        css={styles.imageCss}
        src={
          !isValidImageUrl(imageUrl) || imageError
            ? fallbackImagePath
            : imageUrl
        }
        alt={`${title} 상품`}
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
