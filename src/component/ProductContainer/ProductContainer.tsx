import { css } from "@emotion/react";
import { CartItem } from "../../page/ShopPage";
import Product from "../Product/Product";

export interface Product {
  id: string;
  imageUrl: string;
  name: string;
  price: string;
}

interface ProductContainerProps {
  products: Product[];
  cartItemList: CartItem[];
  onChange: () => void;
}

const ProductContainerLayout = css`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(2, auto);
`;

const loadingLayout = css`
  display: grid;
  grid-column: span 2;
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
`;

export default function ProductContainer({
  products,
  cartItemList,
  onChange,
}: ProductContainerProps) {
  console.log(products);

  return (
    <div css={ProductContainerLayout}>
      {products.length === 0 ? (
        <div css={loadingLayout}>로딩중입니다</div>
      ) : (
        products.map((product) => {
          const selectedCardItems = cartItemList.filter(
            (cartItem: CartItem) => Number(product.id) === cartItem.product.id
          );

          return (
            <Product
              id={product.id}
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
              selectedCardItems={selectedCardItems}
              onChange={onChange}
            />
          );
        })
      )}
    </div>
  );
}
