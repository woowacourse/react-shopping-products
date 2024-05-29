import { useEffect, useState } from "react";
import { getCartItems } from "../../api";
import useProducts from "../../hooks/useProducts";
import ProductListHeader from "../ProductListHeader/ProductListHeader";
import ProductItem from "./ProductItem/ProductItem";
import { ProductListStyle } from "./ProductList.style";

const ProductList = () => {
  const { products, lastProductElementRef, handleCategory, handleSort } =
    useProducts();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  useEffect(() => {
    const fetchCartItems = async () => {
      const cartItems = await getCartItems();
      setCartItems(cartItems);
    };

    fetchCartItems();
  }, []);

  return (
    <>
      <ProductListHeader
        handleCategory={handleCategory}
        handleSort={handleSort}
      />
      <ProductListStyle>
        {products.map((item, index) => {
          return (
            <ProductItem
              cartItems={cartItems}
              product={item}
              key={item.id}
              ref={index === products.length - 1 ? lastProductElementRef : null}
            />
          );
        })}
      </ProductListStyle>
    </>
  );
};

export default ProductList;
