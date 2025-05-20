import ProductCard from "../productCard/ProductCard";
import { CardListContainer } from "./ProductCardList.css";
import { ERROR_TYPE } from "../../hooks/useError";
import ProductCardListSkeleton from "../productCardListSkeleton/ProductCardListSkeleton";
import { useCart } from "../../hooks/useCart";
import { ProductPageResponse } from "../../types/response.types";

interface ProductCardListProps {
  products: ProductPageResponse | null;
  isLoading: boolean;
  setErrorTrue: (type: ERROR_TYPE) => void;
}

function ProductCardList({
  products,
  isLoading,
  setErrorTrue,
}: ProductCardListProps) {
  const { cartItemIds } = useCart();

  if (isLoading) return <ProductCardListSkeleton />;

  return (
    <div css={CardListContainer}>
      {products?.content.map((data) => {
        const cartInfo = {
          cartId: cartItemIds?.find((ids) => ids.productId === data.id)?.cartId,
          cartAmount: cartItemIds.length,
        };

        const productInfo = {
          productId: data.id,
          name: data.name,
          price: data.price,
          imageUrl: data.imageUrl,
          isAdded: Boolean(
            cartItemIds?.find((ids) => ids.productId === data.id)
          ),
        };
        return (
          <ProductCard
            cartInfo={cartInfo}
            productInfo={productInfo}
            key={data.id}
            setErrorTrue={setErrorTrue}
          />
        );
      })}
    </div>
  );
}

export default ProductCardList;
