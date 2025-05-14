import { useState } from "react";
import Header from "./components/Header";
import Select from "./components/Select";
import Text from "./components/Text";
import Card from "./components/Card";
import Button from "./components/Button";
import AddCart from "./components/icons/AddCart";
import { css } from "@emotion/react";

function App() {
  const [filter, setFilter] = useState("전체");
  const [sort, setSort] = useState("높은 가격순");

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
          <Card>
            <Card.Preview>
              <img
                src="https://media.istockphoto.com/id/520700958/ko/%EC%82%AC%EC%A7%84/%EC%95%84%EB%A6%84%EB%8B%A4%EC%9A%B4-%EA%BD%83-%EB%B0%B0%EA%B2%BD%EA%B8%B0%EC%88%A0.jpg?s=612x612&w=0&k=20&c=gJx5-O9U1qXKZqKwv4KunrBae7RDNRcdse1nOdSk_0w="
                alt="effef"
              />
            </Card.Preview>
            <Card.Content style={{ display: "flex", flexDirection: "column", gap: "27px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Text variant="title-2">상품 이름</Text>
                <Text variant="body-2">35,000원</Text>
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
          <Card>
            <Card.Preview>
              <img
                src="https://media.istockphoto.com/id/520700958/ko/%EC%82%AC%EC%A7%84/%EC%95%84%EB%A6%84%EB%8B%A4%EC%9A%B4-%EA%BD%83-%EB%B0%B0%EA%B2%BD%EA%B8%B0%EC%88%A0.jpg?s=612x612&w=0&k=20&c=gJx5-O9U1qXKZqKwv4KunrBae7RDNRcdse1nOdSk_0w="
                alt="effef"
              />
            </Card.Preview>
            <Card.Content style={{ display: "flex", flexDirection: "column", gap: "27px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Text variant="title-2">상품 이름</Text>
                <Text variant="body-2">35,000원</Text>
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
          <Card>
            <Card.Preview>
              <img
                src="https://media.istockphoto.com/id/520700958/ko/%EC%82%AC%EC%A7%84/%EC%95%84%EB%A6%84%EB%8B%A4%EC%9A%B4-%EA%BD%83-%EB%B0%B0%EA%B2%BD%EA%B8%B0%EC%88%A0.jpg?s=612x612&w=0&k=20&c=gJx5-O9U1qXKZqKwv4KunrBae7RDNRcdse1nOdSk_0w="
                alt="effef"
              />
            </Card.Preview>
            <Card.Content style={{ display: "flex", flexDirection: "column", gap: "27px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Text variant="title-2">상품 이름</Text>
                <Text variant="body-2">35,000원</Text>
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
