import { useProductsApi } from "../../domain/contexts/ProductApiContext";
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

const getCategory = (category: CategoryValue) => {
  const categoryValue = CATEGORY_OPTIONS.find(
    ({ value }) => value === category
  );
  return categoryValue?.param;
};

const getPriceSort = (price: SortValue) => {
  const priceSort = PRICE_OPTIONS.find(({ value }) => value === price);
  return priceSort?.param;
};

export default function ProductListToolbar({
  category,
  price,
  setCategory,
  setPrice,
}: ProductListToolbarProps) {
  const { refetchProducts } = useProductsApi();

  const handleCategoryChange = (category: CategoryValue) => {
    setCategory(category);
    refetchProducts(getCategory(category), getPriceSort(price));
  };

  const handlePriceSortChange = (price: SortValue) => {
    setPrice(price);
    refetchProducts(getCategory(category), getPriceSort(price));
  };

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
            onChange={(e) =>
              handleCategoryChange(e.target.value as CategoryValue)
            }
          />
        </S.FirstSelectWrapper>
        <div>
          <S.Label htmlFor="price">가격</S.Label>
          <SelectBox
            id="price"
            name="price"
            value={price}
            options={PRICE_OPTIONS}
            onChange={(e) => handlePriceSortChange(e.target.value as SortValue)}
          />
        </div>
      </S.SelectBoxContainer>
    </S.Container>
  );
}
