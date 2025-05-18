import ProductCard from "../productCard/ProductCard";
import { CardListContainer } from "./ProductCardList.css";
import { ProductPageResponse } from "../../types/response.types";
import useFetchProducts from "../../hooks/useFetchProducts";
import { categoryType, sortType } from "../../types/index.types";
import { ERROR_TYPE } from "../../hooks/useError";
import ProductCardListSkeleton from "../productCardListSkeleton/ProductCardListSkeleton";
import { useState } from "react";

interface ProductCardListProps {
  category: categoryType;
  sort: sortType;
  cartItemIds: Record<"productId" | "cartId", number>[];
  setCartItemIds: React.Dispatch<
    React.SetStateAction<Record<"productId" | "cartId", number>[]>
  >;
  setErrorTrue: (type: ERROR_TYPE) => void;
  fetchCartProducts: () => void;
}

function ProductCardList({
  category,
  sort,
  cartItemIds,
  setCartItemIds,
  setErrorTrue,
  fetchCartProducts,
}: ProductCardListProps) {
  const [products, setProducts] = useState<ProductPageResponse | null>(null);

  const { isLoading } = useFetchProducts({
    category,
    setProducts,
    sort,
    setErrorTrue,
  });

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
            setCartItemIds={setCartItemIds}
            setErrorTrue={setErrorTrue}
            fetchCartProducts={fetchCartProducts}
          />
        );
      })}
    </div>
  );
}

export default ProductCardList;
