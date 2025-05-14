import { ProductItemType, CartItemType } from "@/types/product";
import ProductItem from "./Item";
import * as S from "./ProductList.styled";

interface ProductListProps {
  products: ProductItemType[];
  cartItems: CartItemType[];
}

function ProductList({ products, cartItems }: ProductListProps) {
  return (
    <S.ProductList>
      {products.map((productItem) => {
        const isAddedToCart = cartItems.some(
          ({ product }) => product.id === productItem.id
        );
        return (
          <ProductItem
            key={productItem.id}
            product={productItem}
            isAddedToCart={isAddedToCart}
          />
        );
      })}
    </S.ProductList>
  );
}

export default ProductList;
