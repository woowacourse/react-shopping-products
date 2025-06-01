import * as S from "../../styles/Product/ProductListToolbar.styles";
import SelectBox from "../Common/SelectBox";
import {
  CATEGORY_OPTIONS,
  CategoryValue,
  PRICE_OPTIONS,
  SortValue,
} from "./ProductListContainer";

interface ProductListToolbarProps {
  category: CategoryValue;
  price: SortValue;
  setCategory: React.Dispatch<React.SetStateAction<CategoryValue>>;
  setPrice: React.Dispatch<React.SetStateAction<SortValue>>;
}

export default function ProductListToolbar({
  category,
  price,
  setCategory,
  setPrice,
}: ProductListToolbarProps) {
  return (
    <S.Container>
      <S.Title>bpple 상품 목록</S.Title>
      <S.SelectBoxContainer>
        <S.FirstSelectWrapper>
          <S.Label htmlFor="category">카테고리</S.Label>
          <SelectBox
            id="category"
            name="category"
            value={category}
            options={CATEGORY_OPTIONS}
            onChange={(e) => setCategory(e.target.value as CategoryValue)}
          />
        </S.FirstSelectWrapper>
        <div>
          <S.Label htmlFor="price">가격</S.Label>
          <SelectBox
            id="price"
            name="price"
            value={price}
            options={PRICE_OPTIONS}
            onChange={(e) => setPrice(e.target.value as SortValue)}
          />
        </div>
      </S.SelectBoxContainer>
    </S.Container>
  );
}
