import Header from "@/components/Header";
import ProductContent from "@/components/Product/Content";
import { useCartContext } from "@/context/CartContext";

function ProductPage() {
  const { cartItemData, setCartItemData } = useCartContext();
  return (
    <>
      <Header quantity={cartItemData.length} />
      <ProductContent cartItems={cartItemData} setCartItems={setCartItemData} />
    </>
  );
}

export default ProductPage;
