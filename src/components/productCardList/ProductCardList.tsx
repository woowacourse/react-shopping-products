import ProductCard from "../productCard/ProductCard";
import { CardListContainer } from "./ProductCardList.css";
import { ProductPageResponse } from "../../types/response.types";
import useFetchProducts from "../../hooks/useFetchProducts";
import { categoryType, sortType } from "../../types/index.types";
import { ERROR_TYPE } from "../../hooks/useError";
import ProductCardListSkeleton from "../productCardListSkeleton/ProductCardListSkeleton";

interface ProductCardListProps {
  products: ProductPageResponse | null;
  setProducts: (data: ProductPageResponse) => void;
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
  products,
  setProducts,
  category,
  sort,
  cartItemIds,
  setCartItemIds,
  setErrorTrue,
  fetchCartProducts,
}: ProductCardListProps) {
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

// 장바구니에 있는 상품 id랑  모든 상품 정보들의 id를 비교 -> 추가된거
export default ProductCardList;
