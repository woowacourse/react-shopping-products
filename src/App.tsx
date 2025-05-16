import { useState } from "react";
import { deleteCartItems, getCartItems, getProducts, postCartItems } from "./apis";
import { AddCart, Button, Card, ErrorPopup, Header, RemoveCart, Select, Spinner, Text } from "./components";
import { useFetch } from "./hooks";
import { DEFAULT_IMAGE_URL } from "./constants/images";
import * as S from "./App.styles";
import ProductCard from "./components/ProductCard/ProductCard";

const CATEGORY = ["전체", "식료품", "패션잡화"] as const;
type Category = (typeof CATEGORY)[number];

const SORT = ["높은 가격순", "낮은 가격순"] as const;
type Sort = (typeof SORT)[number];

function App() {
  const [filter, setFilter] = useState<Category>("전체");
  const [sort, setSort] = useState<Sort>("높은 가격순");

  const {
    data: products,
    status: productsStatus,
    error: productsError,
  } = useFetch(() => getProducts({ page: 0, size: 20 }));
  const {
    data: cartItems,
    status: cartItemsStatus,
    fetchData: fetchCartItems,
    error: cartItemsError,
  } = useFetch(() => getCartItems({ page: 0, size: 20 }));

  const handleAddCartItem = async (productId: number) => {
    await postCartItems({ productId, quantity: 1 });
    await fetchCartItems();
  };

  const handleDeleteCartItem = async (productId: number) => {
    const cartItemId = cartItems?.content.find((item) => item.product.id === productId)?.id;

    if (cartItemId === undefined) return;

    await deleteCartItems({ cartItemId });
    await fetchCartItems();
  };

  if (productsStatus === "loading" || cartItemsStatus === "loading") return <Spinner />;
  return (
    <S.AppContainer>
      {productsError && <ErrorPopup errorMessage={productsError.message} setErrorMessage={setProductsErrorMessage} />}
      {cartItemsError && (
        <ErrorPopup errorMessage={cartItemsError.message} setErrorMessage={setCartItemsErrorMessage} />
      )}

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
    </S.AppContainer>
  );
}

export default App;
