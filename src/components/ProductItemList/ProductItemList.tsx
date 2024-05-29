import useProductList from "../../hooks/useProductList";
import ProductItem from "../ProductItem/ProductItem";
import * as S from "./ProductItemList.style";

function ProductItemList() {
  const { productList } = useProductList();
  // prodoct fetch 확인용
  console.log(productList)
  return (
    <S.Container>
      {productList.map((product, idx) => {
        return <ProductItem key={idx} product={product} />;
      })}
      {/* <>여기는 그냥 warning때문에 key를 product.id에서 idx로 바꿔줬어</> */}
    </S.Container>
  );
}

export default ProductItemList;
