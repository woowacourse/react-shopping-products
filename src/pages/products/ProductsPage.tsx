import { deleteCartItems, getCartItems, getProducts, postCartItems } from "@/apis";
import { Header, Select, Spinner, Text } from "@/components";
import { useError } from "@/context";
import { useFetch } from "@/hooks";
import { useState } from "react";
import { ProductCard } from "./components";

import * as S from "./ProductsPage.styles";
import { CATEGORY, DEFAULT_FILTER, DEFAULT_SORT, ERROR_MESSAGE, SORT } from "./constants";
import { Category, Sort } from "./types";

export default function ProductsPage() {
  const [filter, setFilter] = useState<Category>(DEFAULT_FILTER);
  const [sort, setSort] = useState<Sort>(DEFAULT_SORT);

  const { showError } = useError();

  const { data: products, status: productsStatus } = useFetch(() => getProducts());
  const { data: cartItems, status: cartItemsStatus, fetchData: fetchCartItems } = useFetch(() => getCartItems());

  const addCartItem = async (productId: number) => {
    try {
      await postCartItems({ productId });
      await fetchCartItems();
    } catch (error) {
      showError(ERROR_MESSAGE.ADD_CART_ITEM);
    }
  };

  const deleteCartItem = async (productId: number) => {
    const cartItemId = cartItems?.content.find((item) => item.product.id === productId)?.id;

    if (cartItemId === undefined) return;

    try {
      await deleteCartItems({ cartItemId });
      await fetchCartItems();
    } catch (error) {
      showError(ERROR_MESSAGE.DELETE_CART_ITEM);
    }
  };

  const isLoading = productsStatus === "loading" || cartItemsStatus === "loading";

  if (isLoading && !cartItems) return <Spinner />;
  return (
    <>
      <Header shoppingCount={cartItems?.content?.length} />

      <S.ProductPageWrapper>
        <Text variant="title-1">bpple 상품 목록</Text>

        <S.SelectWrapper>
          <Select options={CATEGORY} selectedItem={filter} setSelectedItem={setFilter} />
          <Select options={SORT} selectedItem={sort} setSelectedItem={setSort} />
        </S.SelectWrapper>

        <S.CardWrapper>
          {cartItems &&
            products?.content
              ?.filter((product) => filter === "전체" || product.category === filter)
              ?.sort((productA, productB) =>
                sort === "낮은 가격순" ? productA.price - productB.price : productB.price - productA.price,
              )
              ?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isCartItem={cartItems.content.some((item) => item.product.id === product.id)}
                  handleAddCartItem={addCartItem}
                  handleDeleteCartItem={deleteCartItem}
                />
              ))}
        </S.CardWrapper>
      </S.ProductPageWrapper>
    </>
  );
}
