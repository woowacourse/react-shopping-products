import { commonOpts } from "../../../constants/requestHeader.ts";
import { URLS } from "../../../constants/url.ts";
import { useErrorContext } from "../../../contexts/ErrorContext.tsx";
import { useData } from "../../../hooks/useData.ts";
import useFetch from "../../../hooks/useFetch.ts";
import { CartItem } from "../../../types/cartContents.ts";
import CartButton from "../../CartButton/CartButton";
import QuantityButton from "../../QuantityButton/QuantityButton.tsx";
import Spinner from "../../Spinner/Spinner";
import * as styles from "./CartCard.style.tsx";
import { useState, useMemo, useEffect } from "react";

interface CartCardProps {
  cartItem: CartItem;
}
type ImageStatus = "loading" | "loaded" | "error";

function CartCard({ cartItem }: CartCardProps) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [imageStatus, setImageStatus] = useState<ImageStatus>("loading");
  const [finalImageUrl, setFinalImageUrl] = useState<string>(
    cartItem.product.imageUrl
  );

  const { refetch: fetchCart } = useData(
    "cart-items",
    URLS.CART_ITEMS,
    commonOpts,
    false
  );
  const { fetcher: deleteItem, error: deleteError } = useFetch(
    `${URLS.CART_ITEMS}/${cartItem.id}`,
    { ...commonOpts, method: "DELETE" },
    false
  );

  const { showError } = useErrorContext();
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
  const handleCartItemDelete = async () => {
    try {
      setDeleteLoading(true);
      await deleteItem();
      await fetchCart();
    } catch (error) {
      if (error instanceof Error) showError(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  // 이미지 URL 검증 및 처리
  useEffect(() => {
    if (!isValidImageUrl(cartItem.product.imageUrl)) {
      setImageStatus("error");
      setFinalImageUrl(fallbackImagePath);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setImageStatus("loaded");
      setFinalImageUrl(cartItem.product.imageUrl);
    };
    img.onerror = () => {
      setImageStatus("error");
      setFinalImageUrl(fallbackImagePath);
    };
    img.src = cartItem.product.imageUrl;
  }, [cartItem.product.imageUrl, fallbackImagePath]);

  return (
    <li css={styles.cartCardCss}>
      {imageStatus === "loading" && <Spinner size={"large"} />}

      <div css={styles.cartCardImageCss}>
        <img
          src={imageStatus === "error" ? fallbackImagePath : finalImageUrl}
          alt={`${cartItem.product.name} 상품`}
          onLoad={() => setImageStatus("loaded")}
          onError={() => setImageStatus("error")}
        />
        {cartItem.product.quantity === 0 && (
          <div css={styles.cartCardSoldOutCss}>
            <p>품절</p>
          </div>
        )}
      </div>
      <div css={styles.cartCardDetailCss}>
        <h2>{cartItem.product.name}</h2>
        <p>{`${cartItem.product.price.toLocaleString()}원`}</p>
        <QuantityButton
          productId={cartItem.product.id}
          cartItemId={cartItem.id}
          disableButtonWhenQuantityOne={true}
        />
        ;
      </div>
      <button
        css={styles.cartCardDeleteCss}
        onClick={handleCartItemDelete}
        disabled={deleteLoading}
      >
        삭제
      </button>
    </li>
  );
}

export default CartCard;
