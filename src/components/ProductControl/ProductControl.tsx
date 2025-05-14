import * as S from "./ProductControl.styled";
import Select from "../common/Select/Select";
import { CategoryOptions, SortOptions } from "../../constants/selectOptions";
import { Dispatch, SetStateAction, useState } from "react";
import { ResponseProduct } from "../../api/types";
import getProductList from "../../api/ProductListApi";

function ProductControl({
  setProductList,
}: {
  setProductList: Dispatch<SetStateAction<ResponseProduct[]>>;
}) {
  const [category, setCategory] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  async function handleCategoryChange(category: string) {
    setCategory(category);
    const rawProductList = await getProductList({ category, sort });
    setProductList(rawProductList);
  }

  async function handleSortChange(sort: string) {
    setSort(sort);
    const rawProductList = await getProductList({ category, sort });
    setProductList(rawProductList);
  }

  return (
    <S.ProductControlContainer>
      <S.ProductControlTitle>bpple 상품목록</S.ProductControlTitle>
      <S.SelectContainer>
        <Select options={CategoryOptions} onChange={handleCategoryChange} />
        <Select options={SortOptions} onChange={handleSortChange} />
      </S.SelectContainer>
    </S.ProductControlContainer>
  );
}

export default ProductControl;
