import { Select, Spinner, Text } from "@/components";
import { useState } from "react";
import { ProductCard } from "..";
import { CATEGORY, DEFAULT_FILTER, DEFAULT_SORT, SORT } from "../../constants";
import { useCartItem } from "../../hooks";
import { Category, Sort } from "../../types";
import * as S from "./ProductList.styles";

export default function ProductList() {
  const [filter, setFilter] = useState<Category>(DEFAULT_FILTER);
  const [sort, setSort] = useState<Sort>(DEFAULT_SORT);

  const {
    increaseCartItem,
    decreaseCartItem,
    products,
    cartItems,
    productsStatus,
    cartItemsStatus,
    deleteCartItemStatus,
    patchCartItemStatus,
    postCartItemStatus,
  } = useCartItem();

  const isLoading = productsStatus === "loading" || cartItemsStatus === "loading";

  if (isLoading && !cartItems) return <Spinner />;
  return (
    <S.ProductPageWrapper>
      <Text variant="title-1">피터네 상품 목록</Text>

      <S.SelectWrapper>
        <Select options={CATEGORY} selectedItem={filter} setSelectedItem={setFilter} />
        <Select options={SORT} selectedItem={sort} setSelectedItem={setSort} />
      </S.SelectWrapper>

      <S.CardWrapper>
        {products?.content
          .filter((product) => filter === "전체" || product.category === filter)
          .sort((productA, productB) =>
            sort === "낮은 가격순" ? productA.price - productB.price : productB.price - productA.price,
          )
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cartItem={cartItems?.content.find((item) => item.product.id === product.id)}
              onIncreaseCartItem={increaseCartItem}
              onDecreaseCartItem={decreaseCartItem}
              isLoading={
                postCartItemStatus === "loading" ||
                patchCartItemStatus === "loading" ||
                deleteCartItemStatus === "loading"
              }
            />
          ))}
      </S.CardWrapper>
    </S.ProductPageWrapper>
  );
}
