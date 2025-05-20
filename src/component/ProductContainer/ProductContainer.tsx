import { CartItem } from "../../page/ShopPage";
import Product from "../Product/Product";
import { ProductContainerLayout } from "./ProductContainer.style";

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

export default function ProductContainer({
  products,
  cartItemList,
  onChange,
}: ProductContainerProps) {
  return (
    <div css={ProductContainerLayout}>
      {products.map((product) => {
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
      })}
    </div>
  );
}
