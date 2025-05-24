import { useProductContext } from "../../../domain/contexts/ProductContext";
import Spinner from "../../Common/Spinner";
import ProductList from "../ProductList/ProductList";
import ProductListToolbar from "../ProductListToolbar/ProductListToolbar";
import { StyledSpinnerWrapper } from "./ProductListContainer.styles";

export default function ProductListContainer() {
  const { status, setProducts, products } = useProductContext();

  if (status === "loading") {
    return (
      <StyledSpinnerWrapper>
        <Spinner size={100} color="red" />
      </StyledSpinnerWrapper>
    );
  }
  if (status === "error") {
    return <div>상품을 불러오는데 실패했습니다.</div>;
  }

  return (
    <>
      <ProductListToolbar setProducts={setProducts} />
      <ProductList productList={products} />
    </>
  );
}
