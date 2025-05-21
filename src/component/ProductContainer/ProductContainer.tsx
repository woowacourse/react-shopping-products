import { CartItemType } from "../../types/cartItem";
import { ProductType } from "../../types/product";
import Product from "../Product/Product";
import { ProductContainerLayout } from "./ProductContainer.style";

interface ProductContainerProps {
  products: ProductType[];
  cartItemList: CartItemType[];
  onChange: () => void;
}

export default function ProductContainer({
  products,
  cartItemList,
  onChange,
}: ProductContainerProps) {
  return (
    <div css={ProductContainerLayout}>
      {products.map((product) => {
        const selectedCardItems = cartItemList.filter(
          (cartItem: CartItemType) => Number(product.id) === cartItem.product.id
        );
        return (
          <Product
            key={product.id}
            id={product.id}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
            selectedCartItems={selectedCardItems}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
}
