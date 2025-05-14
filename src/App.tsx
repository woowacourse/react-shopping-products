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
import { getCartItems } from "./apis/cartItem";

function App() {
  const [filter, setFilter] = useState("전체");
  const [sort, setSort] = useState("높은 가격순");

  const [products, setProducts] = useState<Content[]>();

  const getProduct = async () => {
    const data = await getProducts({ page: 0, size: 20 });

    setProducts(data.content);
    return data;
  };

  const getCardItem = async () => {
    const data = await getCartItems({ page: 0, size: 20 });
    console.log(data);
  };

  useEffect(() => {
    getProduct();
    getCardItem();
  }, []);

  return (
    <div css={appStyle}>
      <Header shoppingCount={3} />

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
              <Card>
                <Card.Preview>
                  <img src={product.imageUrl} alt={product.name} />
                </Card.Preview>
                <Card.Content style={{ display: "flex", flexDirection: "column", gap: "27px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Text variant="title-2">{product.name}</Text>
                    <Text variant="body-2">{product.price.toLocaleString()}원</Text>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button>
                      <AddCart />
                      <Text variant="body-2" color="#fff">
                        담기
                      </Text>
                    </Button>
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
  width: 100%;
  height: 100vh;
  max-width: 430px;
  margin: 0 auto;
  background-color: #fff;
`;

const containerStyle = css`
  padding: 36px 24px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const selectBoxStyle = css`
  display: flex;
  justify-content: space-between;
  gap: 132px;
`;

const cardContainerStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  justify-items: center;
`;
