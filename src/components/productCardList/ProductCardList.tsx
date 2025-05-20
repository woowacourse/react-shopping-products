import ProductCard from "../productCard/ProductCard";
import { CardListContainer } from "./ProductCardList.css";
import useFetchProducts from "../../hooks/useFetchProducts/useFetchProducts";
import { categoryType, sortType } from "../../types/index.types";
import ProductCardListSkeleton from "../productCardListSkeleton/ProductCardListSkeleton";

interface ProductCardListProps {
  category: categoryType;
  sort: sortType;
  cartItemIds: Record<"productId" | "cartId", number>[];
  setCartItemIds: React.Dispatch<
    React.SetStateAction<Record<"productId" | "cartId", number>[]>
  >;
  fetchCartProducts: () => void;
}

function ProductCardList({
  category,
  sort,
  cartItemIds,
  setCartItemIds,
  fetchCartProducts,
}: ProductCardListProps) {
  const { products, isLoading } = useFetchProducts({
    category,
    sort,
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
            fetchCartProducts={fetchCartProducts}
          />
        );
      })}
    </div>
  );
}

export default ProductCardList;
