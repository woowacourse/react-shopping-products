import { useState } from "react";
import DropdownContainer from "../DropdownContainer/DropdownContainer";
import * as S from "./ProductItemSection.style";
import { Category } from "../../interfaces/Product";
import { Sorting } from "../../interfaces/Sorting";
import ProductItemList from "../ProductItemList/ProductItemList";

function ProductItemSection() {
  const [category, setCategory] = useState<Category>("" as Category);
  const [sortingOption, setSortingOption] = useState<Sorting>(
    Sorting.PRICE_ASC
  );
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value as Category);
  const handleSortingChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSortingOption(e.target.value as Sorting);
  return (
    <S.ProductSectionContainer>
      <DropdownContainer
        category={category}
        onChangeCategory={handleCategoryChange}
        sortingOption={sortingOption}
        onChangeSortingOption={handleSortingChange}
      />
      <ProductItemList category={category} sortOption={sortingOption} />
    </S.ProductSectionContainer>
  );
}

export default ProductItemSection;
