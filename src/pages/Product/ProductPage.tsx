import { getCartItems } from "@/apis/cartItems/getCartItems";
import Header from "@/components/Header";
import ProductContent from "@/components/Product/Content";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { useState, use } from "react";

const cartItemResource = getCartItems();
function ProductPage() {
  const cartItemData = use(cartItemResource);
  const [cartItems, setCartItems] = useState<CartItemType[]>(cartItemData);

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
