import ProductCard from "../productCard/ProductCard";
import { CardListContainer } from "./ProductCardList.css";
import { CategoryType, SortType } from "../../types/index.types";
import useProduct from "../../hooks/useProduct/useProduct";
import fetchProducts from "../../api/fetchProducts";
import { useCallback } from "react";
import ProductCardListSkeleton from "../productCardListSkeleton/ProductCardListSkeleton";
import useCart from "../../hooks/useCart/useCart";

interface ProductCardListProps {
  category: CategoryType;
  sort: SortType;
}

function ProductCardList({ category, sort }: ProductCardListProps) {
  const { products } = useProduct({
    fetchFn: useCallback(
      () => fetchProducts({ category, sort }),
      [category, sort]
    ),
  });
  const { cartItemIds } = useCart();

  if (products === null) return <ProductCardListSkeleton />;

  return (
    <div css={CardListContainer}>
      {products?.map((data) => {
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
          quantity: data.quantity,
        };
        return (
          <ProductCard
            cartInfo={cartInfo}
            productInfo={productInfo}
            key={data.id}
          />
        );
      })}
    </div>
  );
}

export default ProductCardList;
