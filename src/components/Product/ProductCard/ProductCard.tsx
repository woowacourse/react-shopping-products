import { useQueryContext } from "@/contexts/QueryContext";
import CartButton from "@/components/CartButton/CartButton";
import Spinner from "@/components/Spinner/Spinner";
import * as styles from "./ProductCard.style";
import { useState, useMemo, useEffect } from "react";

interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  productId: number;
  cartItemId?: number;
}
type ImageStatus = "loading" | "loaded" | "error";

function ProductCard({
  title,
  price,
  imageUrl,
  productId,
  cartItemId,
}: ProductCardProps) {
  const [imageStatus, setImageStatus] = useState<ImageStatus>("loading");
  const [finalImageUrl, setFinalImageUrl] = useState<string>(imageUrl);
  const { dataPool } = useQueryContext();
  const productsData = dataPool["products"];
  const productQuantity = productsData?.find(
    (product) => product.id === productId
  )?.quantity;

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

  // 이미지 URL 검증 및 처리
  useEffect(() => {
    if (!isValidImageUrl(imageUrl)) {
      setImageStatus("error");
      setFinalImageUrl(fallbackImagePath);
      return;
    }

    // 이미지 미리 로드하여 CORS 문제 확인
    const img = new Image();
    img.onload = () => {
      setImageStatus("loaded");
      setFinalImageUrl(imageUrl);
    };
    img.onerror = () => {
      setImageStatus("error");
      setFinalImageUrl(fallbackImagePath);
    };
    img.src = imageUrl;
  }, [imageUrl, fallbackImagePath]);

  return (
    <li css={styles.cardCss} data-testid="product-card">
      {imageStatus === "loading" && <Spinner size={"large"} />}

      <div css={styles.imageCss}>
        <img
          src={imageStatus === "error" ? fallbackImagePath : finalImageUrl}
          alt={`${title} 상품`}
          onLoad={() => setImageStatus("loaded")}
          onError={() => setImageStatus("error")}
        />
        {productQuantity === 0 && (
          <div css={styles.soldOutCss}>
            <p>품절</p>
          </div>
        )}
        {productQuantity && productQuantity < 3 && (
          <div css={styles.soldOutSoonCss}>
            <span className="track">
              <span className="msg">⚠️ 품절 임박! 서둘러 구매하세요!</span>
              <span className="msg" aria-hidden>
                ⚠️ 품절 임박! 서둘러 구매하세요!
              </span>
            </span>
          </div>
        )}
      </div>
      <div css={styles.detailCss}>
        <h2>{title}</h2>
        <p>{`${price.toLocaleString()}원`}</p>
        <div css={styles.detailsContainerCss}>
          <p>
            {productQuantity === 0
              ? "현재 구매할 수 없는 상품입니다."
              : `재고: ${productQuantity}개`}
          </p>
          <CartButton productId={productId} cartItemId={Number(cartItemId)} />
        </div>
      </div>
    </li>
  );
}

export default ProductCard;
