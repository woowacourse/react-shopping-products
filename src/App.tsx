import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { getProducts } from "./apis/product";
import Button from "./components/Button";
import Card from "./components/Card";
import Header from "./components/Header";
import AddCart from "./components/icons/AddCart";
import Select from "./components/Select";
import Text from "./components/Text";
import { Content } from "./types/product";
import { deleteCartItems, getCartItems, postCartItems } from "./apis/cartItem";
import RemoveCart from "./components/icons/RemoveCart";
import { GetCartItemsResponse } from "./types/cartItem";
import Spinner from "./components/Spinner";
import ErrorPopup from "./components/ErrorPopup";

function App() {
  const [filter, setFilter] = useState("전체");
  const [sort, setSort] = useState("높은 가격순");
  const [products, setProducts] = useState<Content[]>();
  const [cartItems, setCartItems] = useState<GetCartItemsResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const getProduct = async () => {
    try {
      const data = await getProducts({ page: 0, size: 20 });
      setProducts(data.content);
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    }
  };

  const getCartItem = async () => {
    try {
      const data = await getCartItems({ page: 0, size: 20 });
      setCartItems(data);
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    }
  };

  const cartItemIds = cartItems && Object.fromEntries(cartItems?.content.map((item) => [item.product.id, item.id]));

  const handleAddCart = async (id: number) => {
    try {
      await postCartItems({ quantity: 1, productId: id });
      await getCartItem();
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    }
  };

  const handleRemoveCart = async (id: number) => {
    try {
      await deleteCartItems({ productId: id });
      await getCartItem();
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    }
  };

  useEffect(() => {
    Promise.all([getProduct(), getCartItem()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Spinner />;
  return (
    <div css={appStyle}>
      {errorMessage && <ErrorPopup errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
      <Header shoppingCount={cartItems?.content?.length} />
      <div css={containerStyle}>
        <Text variant="title-1">bpple 상품 목록</Text>

        <div css={selectBoxStyle}>
          <Select options={["전체", "식료품", "패션잡화"]} selectedItem={filter} setSelectedItem={setFilter} />
          <Select options={["높은 가격순", "낮은 가격순"]} selectedItem={sort} setSelectedItem={setSort} />
        </div>
        <div css={cardContainerStyle}>
          {products
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
                      <Button backgroundColor="#fff" onClick={() => handleRemoveCart(cartItemIds[product.id])}>
                        <RemoveCart />
                        <Text variant="body-2">빼기</Text>
                      </Button>
                    ) : (
                      <Button onClick={() => handleAddCart(product.id)}>
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
