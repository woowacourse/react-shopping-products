import { deleteCartItems, getCartItems, getProducts, postCartItems } from "@/apis";
import { Header, Select, Spinner, Text } from "@/components";
import { useError } from "@/context";
import { useFetch } from "@/hooks";
import { useState } from "react";
import { ProductCard } from "./components";

import * as S from "./ProductsPage.styles";
import { CATEGORY, DEFAULT_PAGE, DEFAULT_SIZE, SORT } from "./constants";
import { DEFAULT_FILTER, DEFAULT_SORT } from "./constants";
import { Category, Sort } from "./types";

export default function ProductsPage() {
  const [filter, setFilter] = useState<Category>(DEFAULT_FILTER);
  const [sort, setSort] = useState<Sort>(DEFAULT_SORT);

  const { showError } = useError();

  const { data: products, status: productsStatus } = useFetch(() =>
    getProducts({ page: DEFAULT_PAGE, size: DEFAULT_SIZE }),
  );
  const {
    data: cartItems,
    status: cartItemsStatus,
    fetchData: fetchCartItems,
  } = useFetch(() => getCartItems({ page: DEFAULT_PAGE, size: DEFAULT_SIZE }));

  const addCartItem = async (productId: number) => {
    try {
      await postCartItems({ productId, quantity: 1 });
      await fetchCartItems();
    } catch (error) {
      showError("장바구니에 추가하는 중 오류가 발생했습니다.");
    }
  };

  const deleteCartItem = async (productId: number) => {
    const cartItemId = cartItems?.content.find((item) => item.product.id === productId)?.id;

    if (cartItemId === undefined) return;

    try {
      await deleteCartItems({ cartItemId });
      await fetchCartItems();
    } catch (error) {
      showError("장바구니에서 삭제하는 중 오류가 발생했습니다.");
    }
  };

  const isLoading = productsStatus === "loading" || cartItemsStatus === "loading";

  if (isLoading) return <Spinner />;
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
            products?.content &&
            products?.content
              ?.filter((product) => (filter === "전체" ? true : product.category === filter))
              ?.sort((productA, productB) =>
                sort === "낮은 가격순" ? productA.price - productB.price : productB.price - productA.price,
              )
              ?.map((product) => (
                <ProductCard
                  key={product.id}
                  cartItems={cartItems}
                  product={product}
                  handleAddCartItem={addCartItem}
                  handleDeleteCartItem={deleteCartItem}
                />
              ))}
        </S.CardWrapper>
      </S.ProductPageWrapper>
    </>
  );
}
