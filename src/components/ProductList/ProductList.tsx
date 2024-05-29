import ProductItem from "./ProductItem/ProductItem";
import { ProductListStyle } from "./ProductList.style";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <ProductListStyle>
      {products.map((item) => {
        return <ProductItem product={item} key={item.id} />;
      })}
    </ProductListStyle>
  );
};

export default ProductList;
