import useProducts from "../../hooks/useProducts";
import ProductListHeader from "../ProductListHeader/ProductListHeader";
import ProductItem from "./ProductItem/ProductItem";
import { ProductListStyle } from "./ProductList.style";

const ProductList = () => {
  const { products, lastProductElementRef, handleCategory, handleSort } =
    useProducts();

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
