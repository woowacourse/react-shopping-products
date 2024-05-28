import ProductItem from "./ProductItem/ProductItem";
import { ProductListStyle } from "./ProductList.style";

const ProductList = () => {
  return (
    <ProductListStyle>
      {Array.from({ length: 21 }, (_, index) => {
        return <ProductItem key={index} />;
      })}
    </ProductListStyle>
  );
};

export default ProductList;
