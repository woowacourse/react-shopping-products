import { CartStyle, PutItemCount } from "./CartButton.css";
import { useData } from "../../provider/DataProvider";
import { useEffect } from "react";
import { CartItemType } from "../../types/response.types";
import useFetchData from "../../hooks/useFetchData";

interface CartButtonProps {
  onClick: () => void;
}

export default function CartButton({ onClick }: CartButtonProps) {
  const { getCartItems } = useFetchData();
  const { getData, fetchData, loading } = useData();

  useEffect(() => {
    fetchData<CartItemType[]>("cart", getCartItems);
  }, [fetchData, getCartItems]);

  if (loading("cart")) return "로딩중...";

  const cartItems = getData<CartItemType[]>("cart") ?? [];

  return (
    <button css={CartStyle} onClick={onClick}>
      <img src="Cart.svg" alt="장바구니 아이콘" />
      <div css={PutItemCount}>{cartItems.length}</div>
    </button>
  );
}
