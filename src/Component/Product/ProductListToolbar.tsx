import { useProductFilters } from "../../domain/hooks/useProductFilter";
import {
  Container,
  FirstSelectWrapper,
  Label,
  SelectBoxContainer,
  Title,
} from "../../styles/Product/ProductListToolbar.styles";
import SelectBox from "../Common/SelectBox";
import {
  CATEGORY_OPTIONS,
  CategoryValue,
  PRICE_OPTIONS,
  SortValue,
} from "./ProductListContainer";
// import useCartContext from "../../../domain/contexts/useCartContext";

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
  const { onCategoryChange, onPriceChange } = useProductFilters(
    setCategory,
    setPrice
  );

  return (
    <Container>
      <Title>bpple 상품 목록</Title>
      <SelectBoxContainer>
        <FirstSelectWrapper>
          <Label htmlFor="category">카테고리</Label>
          <SelectBox
            value={category}
            onChange={onCategoryChange}
            options={CATEGORY_OPTIONS}
            name="category"
            id="category"
          />
        </FirstSelectWrapper>
        <div>
          <Label htmlFor="price">가격</Label>
          <SelectBox
            value={price}
            onChange={onPriceChange}
            options={PRICE_OPTIONS}
            name="price"
            id="price"
          />
        </div>
      </SelectBoxContainer>
    </Container>
  );
}
