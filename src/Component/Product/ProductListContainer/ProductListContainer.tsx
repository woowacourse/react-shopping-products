import ProductList from "../ProductList/ProductList";
import ProductListToolbar from "../ProductListToolbar/ProductListToolbar";
import Spinner from "../../Common/Spinner";
import useCartContext from "../../../contexts/CartContext";
import useFetchProducts from "../../../hooks/useFetchProducts";
import { StyledSpinnerWrapper } from "./ProductListContainer.styles";

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
