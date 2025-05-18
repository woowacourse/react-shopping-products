import { css } from "@emotion/react";
import { Content } from "../../types/product";
import Product from "./Product";
import Text from "../common/Text";
import Button from "../common/Button";
import RemoveCart from "../icons/RemoveCart";
import AddCart from "../icons/AddCart";

interface ProductListProps {
  productsData: Content[];
  cartItemIds: Record<string, number>;
  handleCartItem: (type: "add" | "remove", id: number) => void;
}

const ProductList = ({ productsData, cartItemIds, handleCartItem }: ProductListProps) => {
  return (
    <div css={productListStyle}>
      {productsData?.map((product) => (
        <Product key={product.id}>
          <Product.Preview>
            <img
              src={product.imageUrl}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://www.next-t.co.kr/public/uploads/7b7f7e2138e29e598cd0cdf2c85ea08d.jpg";
              }}
              alt={product.name}
            />
          </Product.Preview>
          <Product.Content style={{ display: "flex", flexDirection: "column", gap: "27px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Text variant="title-2">{product.name}</Text>
              <Text variant="body-2">{product.price.toLocaleString()}원</Text>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {cartItemIds[product.id] ? (
                <Button backgroundColor="#fff" onClick={() => handleCartItem("remove", cartItemIds[product.id])}>
                  <RemoveCart />
                  <Text variant="body-2">빼기</Text>
                </Button>
              ) : (
                <Button onClick={() => handleCartItem("add", product.id)}>
                  <AddCart />
                  <Text variant="body-2" color="#fff">
                    담기
                  </Text>
                </Button>
              )}
            </div>
          </Product.Content>
        </Product>
      ))}
    </div>
  );
};

export default ProductList;

const productListStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 20px;
  justify-items: center;
  overflow-y: scroll;
`;
