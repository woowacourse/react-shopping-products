import { getCartItems } from "@/apis/cartItems/getCartItems";
import { wrapPromise } from "@/apis/wrapPromise";
import Header from "@/components/Header";
import ProductContent from "@/components/Product/Content";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { useState } from "react";

const cartItemResource = wrapPromise(getCartItems());
function ProductPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>(() =>
    cartItemResource.read()
  );

  const updateCartItems = (newCartItems: CartItemType[]) => {
    setCartItems(newCartItems);
  };

  return (
    <>
      <Header quantity={cartItems.length} />
      <ProductContent cartItems={cartItems} updateCartItems={updateCartItems} />
    </>
  );
}

export default ProductPage;
