import { CartItemType, ProductType } from "../../constants";
import Product from "../Product/Product";
import { ProductContainerLayout } from "./ProductContainer.style";

interface ProductContainerProps {
  products: ProductType[];
  cartItemList: CartItemType[];
  updateCardItemList: () => void;
}

export default function ProductContainer({
  products,
  cartItemList,
  updateCardItemList,
}: ProductContainerProps) {
  return (
    <div css={ProductContainerLayout}>
      {products.map((product) => {
        const selectedCardItems = cartItemList.filter(
          (cartItem: CartItemType) => Number(product.id) === cartItem.product.id
        );
        return (
          <Product
            id={product.id}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
            selectedCartItems={selectedCardItems}
            onChange={updateCardItemList}
          />
        );
      })}
    </div>
  );
}
