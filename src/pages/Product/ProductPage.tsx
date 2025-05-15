import { getCartItems } from "@/apis/cartItems/getCartItems";
import { wrapPromise } from "@/apis/wrapPromise";
import Header from "@/components/Header";
import ProductContent from "@/components/Product/Content";
import { CartItemType } from "@/types/cartItem";
import { useState } from "react";

const cartItemResource = wrapPromise(getCartItems());
function ProductPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>(() =>
    cartItemResource.read()
  );

  return (
    <>
      <Header quantity={cartItems.length} />
      <ProductContent cartItems={cartItems} setCartItems={setCartItems} />
    </>
  );
}

export default ProductPage;
