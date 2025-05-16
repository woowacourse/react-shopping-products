import { useState } from "react";
import { deleteCartItems, getCartItems, getProducts, postCartItems } from "@/apis";
import { Header, Select, Spinner, Text } from "@/components";
import ProductCard from "@/components/ProductCard/ProductCard";
import { useError } from "@/context";
import { useFetch } from "@/hooks";
import * as S from "./ProductsPage.styles";

const CATEGORY = ["전체", "식료품", "패션잡화"] as const;
type Category = (typeof CATEGORY)[number];

const SORT = ["높은 가격순", "낮은 가격순"] as const;
type Sort = (typeof SORT)[number];

export default function ProductsPage() {
  const [filter, setFilter] = useState<Category>("전체");
  const [sort, setSort] = useState<Sort>("높은 가격순");

  const { showError } = useError();

  const { data: products, status: productsStatus } = useFetch(() => getProducts({ page: 0, size: 20 }));
  const {
    data: cartItems,
    status: cartItemsStatus,
    fetchData: fetchCartItems,
  } = useFetch(() => getCartItems({ page: 0, size: 20 }));

  const handleAddCartItem = async (productId: number) => {
    try {
      await postCartItems({ productId, quantity: 1 });
      await fetchCartItems();
    } catch (error) {
      showError("장바구니에 추가하는 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteCartItem = async (productId: number) => {
    const cartItemId = cartItems?.content.find((item) => item.product.id === productId)?.id;

    if (cartItemId === undefined) return;

    try {
      await deleteCartItems({ cartItemId });
      await fetchCartItems();
    } catch (error) {
      showError("장바구니에서 삭제하는 중 오류가 발생했습니다.");
    }
  };

  if (productsStatus === "loading" || cartItemsStatus === "loading") return <Spinner />;
  return (
    <>
      <Header shoppingCount={cartItems?.content?.length} />

      <S.Container>
        <Text variant="title-1">bpple 상품 목록</Text>

        <S.SelectBox>
          <Select options={CATEGORY} selectedItem={filter} setSelectedItem={setFilter} />
          <Select options={SORT} selectedItem={sort} setSelectedItem={setSort} />
        </S.SelectBox>

        <S.CardContainer>
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
                  handleAddCartItem={handleAddCartItem}
                  handleDeleteCartItem={handleDeleteCartItem}
                />
              ))}
        </S.CardContainer>
      </S.Container>
    </>
  );
}
