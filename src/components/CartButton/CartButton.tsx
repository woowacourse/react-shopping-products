import * as styles from "./CartButton.style";
import { ComponentProps, useState, useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import { useErrorContext } from "../../contexts/ErrorContext";
import { URLS } from "../../constants/url";
import QuantityButton from "../QuantityButton/QuantityButton";
import { commonOpts } from "../../constants/requestHeader";
import { useData } from "../../hooks/useData";
import { useQueryContext } from "../../contexts/QueryContext";
import { cartQueryOptions } from "@/constants/requestOptions";
import { CartItem } from "@/types/cartContents";

interface CartButtonProps extends ComponentProps<"button"> {
  productId: number;
  cartItemId: number;
}

export default function CartButton({
  productId,
  cartItemId,
  ...props
}: CartButtonProps) {
  const { showError } = useErrorContext();

  const { dataPool } = useQueryContext();
  const { refetch: fetchCart } = useData("cart-items", cartQueryOptions);
  const cartData = dataPool["cart-items"];
  const productsData = dataPool["products"];

  const [loading, setLoading] = useState(false);

  const inCart = useMemo(
    () => cartData?.some((p) => p.product.id === productId),
    [cartData, productId]
  );
  const availableQty = useMemo(
    () => productsData?.find((p) => p.id === productId)?.quantity ?? 0,
    [productsData, productId]
  );

  const addOptions = {
    ...commonOpts,
    method: "POST",
    body: JSON.stringify({ productId, quantity: 1 }),
  };

  const { fetcher: addCartItem } = useFetch<CartItem>(
    URLS.CART_ITEMS,
    addOptions,
    false
  );

  const handleAdd = async () => {
    setLoading(true);
    try {
      if ((cartData?.length ?? 0) >= 50) {
        throw new Error("장바구니에 50개 이상의 품목을 담을수 없습니다.");
      }
      await addCartItem();
      await fetchCart();
    } catch (err) {
      if (err instanceof Error) showError(err);
    } finally {
      setLoading(false);
    }
  };

  if (inCart) {
    return <QuantityButton productId={productId} cartItemId={cartItemId} />;
  }

  const commonProps = {
    ...props,
    disabled: loading || availableQty === 0,
    css: [styles.buttonCss, styles.notInCartCss] as const,
  };

  if (availableQty !== 0) {
    return (
      <button {...commonProps} onClick={handleAdd}>
        <img src="assets/filledCart.svg" alt="장바구니 아이콘" />
        <span>담기</span>
      </button>
    );
  }
}
