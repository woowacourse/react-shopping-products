import * as S from "./ProductControl.styled";
import Select from "../common/Select/Select";
import { CategoryOptions, SortOptions } from "../../constants/selectOptions";
import { Dispatch, SetStateAction } from "react";
import { ResponseProduct } from "../../api/types";
import getProductList from "../../api/ProductListApi";

function ProductControl({
  setProductList,
}: {
  setProductList: Dispatch<SetStateAction<ResponseProduct[]>>;
}) {
  async function handleCategoryChange(category: string) {
    console.log("category", category);
    const rawProductList = await getProductList({ category });
    setProductList(rawProductList);
  }

  return (
    <S.ProductControlContainer>
      <S.ProductControlTitle>bpple 상품목록</S.ProductControlTitle>
      <S.SelectContainer>
        <Select options={CategoryOptions} onChange={handleCategoryChange} />
        <Select options={SortOptions} />
      </S.SelectContainer>
    </S.ProductControlContainer>
  );
}

export default ProductControl;
