import { Header, Select, Spinner, Text } from "@/components";
import { useError } from "@/context";
import { useState } from "react";
import { ProductCard } from "./components";

import { CartItemApi, ProductApi } from "@/apis";
import { useMutation, useQuery } from "@/modules";
import * as S from "./ProductsPage.styles";
import { CATEGORY, DEFAULT_FILTER, DEFAULT_SORT, SORT } from "./constants";
import { Category, Sort } from "./types";
import { useCartItemsQuery } from "@/hooks";
import { GetCartItemsResponse } from "@/types";
import { DeleteCartItemsParams, GetCartItemsParams, PatchCartItemsParams } from "@/apis/CartItemApi";

export default function ProductsPage() {
  const [filter, setFilter] = useState<Category>(DEFAULT_FILTER);
  const [sort, setSort] = useState<Sort>(DEFAULT_SORT);

  const { showError } = useError();

  const { data: products, status: productsStatus } = useQuery({
    queryFn: ProductApi.getAllProducts,
    queryKey: "products",
  });
  const { mutate: mutatePostCartItem } = useMutation({
    mutationFn: CartItemApi.postCartItems,
    queryKey: "cartItems",
  });
  const { mutate: mutatePatchCartItem } = useMutation<PatchCartItemsParams, void, GetCartItemsResponse>({
    mutationFn: CartItemApi.patchCartItems,
    queryKey: "cartItems",
  });
  const { mutate: mutateDeleteCartItem } = useMutation<DeleteCartItemsParams, void, GetCartItemsResponse>({
    mutationFn: CartItemApi.deleteCartItems,
    queryKey: "cartItems",
  });

  const { data: cartItems, status: cartItemsStatus, refetch: refetchCartItems } = useCartItemsQuery();

  const increaseCartItem = async (productId: number) => {
    const cartItem = cartItems?.content.find((item) => item.product.id === productId);

    const product = products?.content.find((item) => item.id === productId);
    if (!product) return;

    const stock = product.stock;

    if (stock < (cartItem?.quantity ?? 0) + 1) {
      showError("재고가 부족합니다.");
      return;
    }

    if (!cartItem) {
      await mutatePostCartItem({ productId });
      await refetchCartItems();
    } else {
      await mutatePatchCartItem(
        {
          cartItemId: cartItem.id,
          quantity: cartItem.quantity + 1,
        },
        (prev) => {
          const currentCartItemIndex = prev.content.findIndex((item) => item.product.id === productId);

          const newCartContent = [...prev.content];
          newCartContent[currentCartItemIndex] = {
            ...newCartContent[currentCartItemIndex],
            quantity: cartItem.quantity + 1,
          };

          return { ...prev, content: newCartContent };
        },
      );
    }
  };

  const decreaseCartItem = async (productId: number) => {
    const cartItem = cartItems?.content.find((item) => item.product.id === productId);

    if (!cartItem) return;

    if (!cartItem || cartItem.quantity === 1) {
      await mutateDeleteCartItem({ cartItemId: cartItem.id }, (prev) => {
        const newCartContent = [...prev.content];
        return {
          ...prev,
          content: newCartContent.filter((item) => item.product.id !== productId),
        };
      });
    } else {
      await mutatePatchCartItem(
        {
          cartItemId: cartItem.id,
          quantity: cartItem.quantity - 1,
        },
        (prev) => {
          const currentCartItemIndex = prev.content.findIndex((item) => item.product.id === productId);

          const newCartContent = [...prev.content];
          newCartContent[currentCartItemIndex] = {
            ...newCartContent[currentCartItemIndex],
            quantity: cartItem.quantity - 1,
          };

          return { ...prev, content: newCartContent };
        },
      );
    }
  };

  const isLoading = productsStatus === "loading" || cartItemsStatus === "loading";

  if (isLoading && !cartItems) return <Spinner />;
  return (
    <>
      <Header />

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
                handleIncreaseCartItem={increaseCartItem}
                handleDecreaseCartItem={decreaseCartItem}
              />
            ))}
        </S.CardWrapper>
      </S.ProductPageWrapper>
    </>
  );
}
