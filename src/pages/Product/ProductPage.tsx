import { getCartItems } from "@/apis/cartItems/getCartItems";
import LoadingFallback from "@/components/Fallback/LoadingFallback";
import Header from "@/components/Header";
import ProductContent from "@/components/Product/Content";
import useData from "@/hooks/useData";
import { CartItemType } from "@/types/cartItem";

function ProductPage() {
  const { data: cartItemData, isLoading } = useData<CartItemType[]>({
    fetchFn: getCartItems,
    name: "cartItemData",
  });

  if (isLoading || !cartItemData)
    return <LoadingFallback message="로딩 중입니다..." />;
  return (
    <>
      <Header quantity={cartItemData.length} />
      <ProductContent />
    </>
  );
}

export default ProductPage;
