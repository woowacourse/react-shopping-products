import { css } from "@emotion/react";
import { Content } from "../../types/product";
import ProductCard from "./ProductCard";
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
        <ProductCard key={product.id}>
          <ProductCard.Image src={product.imageUrl} alt={product.name} />
          <ProductCard.Content>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <ProductCard.Title text={product.name} />
              <ProductCard.Price price={product.price} />
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
          </ProductCard.Content>
        </ProductCard>
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
