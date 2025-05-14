import { ProductItemType } from "@/types/product";
import ProductItem from "./Item";
import * as S from "./ProductList.styled";
import { CartItemType, SetCartItems } from "@/types/cartItem";

interface ProductListProps {
  resource: { read: () => ProductItemType[] };
  cartItems: CartItemType[];
  setCartItems: SetCartItems;
}

function ProductList({ resource, cartItems, setCartItems }: ProductListProps) {
  const products = resource.read();

  return (
    <S.ProductList>
      {products.map((productItem) => (
        <ProductItem
          key={productItem.id}
          product={productItem}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      ))}
    </S.ProductList>
  );
}

export default ProductList;
