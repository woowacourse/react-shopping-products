import { CartStyle, PutItemCount } from "./CartButton.css";
import { useData } from "../../provider/DataProvider";
import { useEffect } from "react";
import { fetchCartItems } from "../../api/cart";
import { CartItemType } from "../../types/response.types";

interface CartButtonProps {
  onClick: () => void;
}

export default function CartButton({ onClick }: CartButtonProps) {
  const { getData, fetchData } = useData();

  useEffect(() => {
    fetchData<CartItemType[]>("cart", fetchCartItems);
  }, [fetchData]);

  const cartItems = getData<CartItemType[]>("cart") ?? [];

  return (
    <button css={CartStyle} onClick={onClick}>
      <img src="Cart.svg" alt="장바구니 아이콘" />
      <div css={PutItemCount}>{cartItems.length}</div>
    </button>
  );
}
