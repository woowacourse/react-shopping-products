import useProductList from "../../hooks/useProductList";
import ProductItem from "../ProductItem/ProductItem";
import * as S from "./ProductItemList.style";

function ProductItemList() {
  const { productList } = useProductList();
  return (
    <S.Container>
      {productList.map((product) => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </S.Container>
  );
}

export default ProductItemList;
