import * as S from "./ProductControl.styled";
import Select from "../common/Select/Select";
import { CategoryOptions, SortOptions } from "../../constants/selectOptions";

function ProductControl() {
  return (
    <S.ProductControlContainer>
      <S.ProductControlTitle>bpple 상품목록</S.ProductControlTitle>
      <S.SelectContainer>
        <Select options={CategoryOptions} />
        <Select options={SortOptions} />
      </S.SelectContainer>
    </S.ProductControlContainer>
  );
}

export default ProductControl;
