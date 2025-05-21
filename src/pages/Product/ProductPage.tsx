import Header from "@/components/Header";
import ProductContent from "@/components/Product/Content";
import { useCartContext } from "@/context/CartContext";

function ProductPage() {
  const { cartItemData } = useCartContext();
  return (
    <>
      <Header quantity={cartItemData.length} />
      <ProductContent />
    </>
  );
}

export default ProductPage;
