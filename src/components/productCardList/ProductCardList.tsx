import ProductCard from "../productCard/ProductCard";
import { CardListContainer } from "./ProductCardList.css";
import { ProductPageResponse } from "../../types/response.types";
import useFetchProducts from "../../hooks/useFetchProducts";
import { categoryType, sortType } from "../../types/index.types";
import { ERROR_TYPE } from "../../hooks/useError";

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
  setErrorFalse: () => void;
}

function ProductCardList({
  products,
  setProducts,
  category,
  sort,
  cartItemIds,
  setCartItemIds,
  setErrorTrue,
  setErrorFalse,
}: ProductCardListProps) {
  useFetchProducts({ category, setProducts, sort, setErrorTrue });

  return (
    <div css={CardListContainer}>
      {products?.content.map((data) => (
        <ProductCard
          productId={data.id}
          cartId={cartItemIds?.find((ids) => ids.productId === data.id)?.cartId}
          key={data.id}
          isAdded={Boolean(
            cartItemIds?.find((ids) => ids.productId === data.id)
          )}
          name={data.name}
          price={data.price}
          imageUrl={data.imageUrl}
          setCartItemIds={setCartItemIds}
          setErrorTrue={setErrorTrue}
          setErrorFalse={setErrorFalse}
        />
      ))}
    </div>
  );
}

// 장바구니에 있는 상품 id랑  모든 상품 정보들의 id를 비교 -> 추가된거
export default ProductCardList;
