import { css } from "@emotion/react";
import { useState } from "react";
import { Button, Card, Header, Select, Text, RemoveCart, AddCart, Spinner, ErrorPopup } from "./components";
import { useProducts, useCartItems } from "./hooks";

const CATEGORY = ["전체", "식료품", "패션잡화"] as const;
type Category = (typeof CATEGORY)[number];

const SORT = ["높은 가격순", "낮은 가격순"] as const;
type Sort = (typeof SORT)[number];

function App() {
  const [filter, setFilter] = useState<Category>("전체");
  const [sort, setSort] = useState<Sort>("높은 가격순");

  const { products, isProductsLoading, productsErrorMessage, setProductsErrorMessage } = useProducts();
  const {
    cartItems,
    isCartItemsLoading,
    cartItemsErrorMessage,
    setCartItemsErrorMessage,
    addCart,
    removeCart,
    cartItemIds,
  } = useCartItems();

  if (isProductsLoading || isCartItemsLoading) return <Spinner />;
  return (
    <div css={appStyle}>
      {productsErrorMessage && (
        <ErrorPopup errorMessage={productsErrorMessage} setErrorMessage={setProductsErrorMessage} />
      )}
      {cartItemsErrorMessage && (
        <ErrorPopup errorMessage={cartItemsErrorMessage} setErrorMessage={setCartItemsErrorMessage} />
      )}

      <Header shoppingCount={cartItems?.content?.length} />
      <div css={containerStyle}>
        <Text variant="title-1">bpple 상품 목록</Text>

        <div css={selectBoxStyle}>
          <Select options={CATEGORY} selectedItem={filter} setSelectedItem={setFilter} />
          <Select options={SORT} selectedItem={sort} setSelectedItem={setSort} />
        </div>
        <div css={cardContainerStyle}>
          {products?.content
            ?.filter((product) => (filter === "전체" ? true : product.category === filter))
            ?.sort((productA, productB) =>
              sort === "낮은 가격순" ? productA.price - productB.price : productB.price - productA.price,
            )
            ?.map((product) => (
              <Card key={product.id}>
                <Card.Preview>
                  <img
                    src={product.imageUrl}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://www.next-t.co.kr/public/uploads/7b7f7e2138e29e598cd0cdf2c85ea08d.jpg";
                    }}
                    alt={product.name}
                  />
                </Card.Preview>
                <Card.Content style={{ display: "flex", flexDirection: "column", gap: "27px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Text variant="title-2">{product.name}</Text>
                    <Text variant="body-2">{product.price.toLocaleString()}원</Text>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    {cartItemIds && cartItemIds[product.id] ? (
                      <Button backgroundColor="#fff" onClick={() => removeCart(cartItemIds[product.id])}>
                        <RemoveCart />
                        <Text variant="body-2">빼기</Text>
                      </Button>
                    ) : (
                      <Button onClick={() => addCart(product.id)}>
                        <AddCart />
                        <Text variant="body-2" color="#fff">
                          담기
                        </Text>
                      </Button>
                    )}
                  </div>
                </Card.Content>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;

const appStyle = css`
  position: relative;
  width: 100%;
  height: 100vh;
  max-width: 430px;
  margin: 0 auto;
  background-color: #fff;
`;

const containerStyle = css`
  padding: 36px 24px;
  display: flex;
  height: calc(100% - 64px);
  flex-direction: column;
  gap: 28px;
`;

const selectBoxStyle = css`
  display: flex;
  justify-content: space-between;
  gap: 132px;
`;

const cardContainerStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 20px;
  justify-items: center;
  overflow-y: scroll;
`;
