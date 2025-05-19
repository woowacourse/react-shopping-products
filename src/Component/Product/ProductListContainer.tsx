import ProductList from "./ProductList";
import ProductListToolbar from "./ProductListToolbar";
import Spinner from "../Common/Spinner";
import styled from "@emotion/styled";
import useCartContext from "../../contexts/CartContext";
import useFetchProducts from "../../hooks/useFetchProducts";

export default function ProductListContainer() {
  const { updateErrorMessage } = useCartContext();
  const { products, status, setProducts } =
    useFetchProducts(updateErrorMessage);

  return (
    <>
      <ProductListToolbar setProducts={setProducts} />
      {status === "loading" && (
        <StyledSpinnerWrapper>
          <Spinner size={100} color="red" />
        </StyledSpinnerWrapper>
      )}

      {status === "success" && <ProductList productList={products} />}
    </>
  );
}

const StyledSpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
