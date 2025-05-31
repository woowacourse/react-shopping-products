import { css } from "@emotion/react";
import ProductCard from "./ProductCard";
import IconButton from "../common/Button/IconButton";
import AddCart from "../icons/AddCart";
import QuantitySelector from "../common/QuantitySelector";
import useCartItems from "../../hooks/useCartItems";
import { Product } from "../../types";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  const { handleCartItem, cartItemsByProductId } = useCartItems();

  return (
    <div css={productListStyle}>
      {products?.map((product) => {
        const { id, imageUrl, name, price, quantity } = product;
        const cartItem = cartItemsByProductId[id];

        return (
          <ProductCard key={id}>
            {quantity === 0 && <ProductCard.SoldOutCover />}
            <ProductCard.Image src={imageUrl} alt={name} />
            <ProductCard.Content>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <ProductCard.Title text={name} />
                <ProductCard.Price price={price} />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {cartItem ? (
                  <QuantitySelector
                    quantity={cartItem.quantity}
                    onIncrease={() => handleCartItem("update", cartItem.cartItemId, cartItem.quantity + 1)}
                    onDecrease={() => handleCartItem("update", cartItem.cartItemId, cartItem.quantity - 1)}
                  />
                ) : (
                  <IconButton icon={<AddCart />} variant="dark" onClick={() => handleCartItem("add", id)}>
                    담기
                  </IconButton>
                )}
              </div>
            </ProductCard.Content>
          </ProductCard>
        );
      })}
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
