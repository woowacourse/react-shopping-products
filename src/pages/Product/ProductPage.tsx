import { getCartItems } from "@/apis/cartItems/getCartItems";
import Header from "@/components/Header";
import ProductContent from "@/components/Product/Content";
import { CartItemType } from "@/types/cartItem";
import { useEffect, useState } from "react";

function ProductPage() {
  const [cartItemData, setCartItemData] = useState<CartItemType[]>([]);

  useEffect(() => {
    async function fetchCartItems() {
      const cartItems = await getCartItems();
      setCartItemData(cartItems);
    }
    fetchCartItems();
  }, []);

  return (
    <>
      <Header quantity={cartItemData.length} />
      <ProductContent cartItems={cartItemData} setCartItems={setCartItemData} />
    </>
  );
}

export default ProductPage;
