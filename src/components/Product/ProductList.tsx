import { css } from "@emotion/react";
import { Content } from "../../types/product";
import ProductCard from "./ProductCard";
import IconButton from "../common/Button/IconButton";
import AddCart from "../icons/AddCart";
import QuantitySelector from "../QuantitySelector";

interface ProductListProps {
  productsData: Content[];
  cartItemsByProductId: Record<string, Record<"cartItemId" | "quantity", number>>;
  handleCartItem: (type: "add" | "update" | "remove", id: number, quantity?: number) => void;
}

const ProductList = ({ productsData, cartItemsByProductId, handleCartItem }: ProductListProps) => {
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
              {cartItemsByProductId[product.id] ? (
                <QuantitySelector
                  quantity={cartItemsByProductId[product.id].quantity}
                  onIncrease={() =>
                    handleCartItem(
                      "update",
                      cartItemsByProductId[product.id].cartItemId,
                      cartItemsByProductId[product.id].quantity + 1,
                    )
                  }
                  onDecrease={() =>
                    handleCartItem(
                      "update",
                      cartItemsByProductId[product.id].cartItemId,
                      cartItemsByProductId[product.id].quantity - 1,
                    )
                  }
                />
              ) : (
                <IconButton icon={<AddCart />} variant="dark" onClick={() => handleCartItem("add", product.id)}>
                  담기
                </IconButton>
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
  padding-top: 8px;
  padding-bottom: 20px;
  row-gap: 20px;
  justify-items: center;
  overflow-y: scroll;
`;
