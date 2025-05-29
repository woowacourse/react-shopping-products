import { cartQueryOptions } from "@/constants/requestOptions.ts";
import { commonOpts } from "../../../constants/requestHeader.ts";
import { URLS } from "../../../constants/url.ts";
import { useErrorContext } from "../../../contexts/ErrorContext.tsx";
import useFetch from "../../../hooks/useFetch.ts";
import { CartItem } from "../../../types/cartContents.ts";
import QuantityButton from "../../QuantityButton/QuantityButton.tsx";
import Spinner from "../../Spinner/Spinner";
import * as styles from "./CartCard.style.tsx";
import { useState, useMemo, useEffect } from "react";
import useQueryData from "../../../hooks/useQueryData.ts";

interface CartCardProps {
  cartItem: CartItem;
}
type ImageStatus = "loading" | "loaded" | "error";

function CartCard({ cartItem }: CartCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageStatus, setImageStatus] = useState<ImageStatus>("loading");
  const [finalImageUrl, setFinalImageUrl] = useState<string>(
    cartItem.product.imageUrl
  );

  const { loadData: loadCart } = useQueryData("cart-items", cartQueryOptions);
  const { fetcher: deleteItem } = useFetch<CartItem>(
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
      setIsDeleting(true);
      await deleteItem();
      await loadCart();
    } catch (error) {
      if (error instanceof Error) showError(error);
    } finally {
      setIsDeleting(false);
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
      <div css={styles.cartCardImageCss}>
        {imageStatus === "loading" ? (
          <Spinner size="large" />
        ) : (
          <img
            src={imageStatus === "error" ? fallbackImagePath : finalImageUrl}
            alt={`${cartItem.product.name} 상품`}
          />
        )}
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
          disableButtonWhenQuantityOne
        />
      </div>
      <button
        css={styles.cartCardDeleteCss}
        onClick={handleCartItemDelete}
        disabled={isDeleting}
      >
        삭제
      </button>
    </li>
  );
}

export default CartCard;
