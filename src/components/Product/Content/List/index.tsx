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
    <>
      {products.length > 0 ? (
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
      ) : (
        <S.EmptyProductList>등록된 상품이 없습니다.</S.EmptyProductList>
      )}
    </>
  );
}

export default ProductList;
