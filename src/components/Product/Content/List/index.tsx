import { ProductItemType } from "@/types/product";
import ProductItem from "./Item";
import * as S from "./ProductList.styled";
import { CartItemType, SetCartItems } from "@/types/cartItem";

interface ProductListProps {
  productData: ProductItemType[];
  cartItems: CartItemType[];
  setCartItems: SetCartItems;
}

function ProductList({
  productData,
  cartItems,
  setCartItems,
}: ProductListProps) {
  return (
    <>
      {productData.length > 0 ? (
        <S.ProductList>
          {productData.map((productItem) => (
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
