import { useState } from "react";
import DropdownContainer from "../DropdownContainer/DropdownContainer";
import * as S from "./ProductItemSection.style";
import { Category } from "../../interfaces/Product";
import { Sorting } from "../../interfaces/Sorting";
import ProductItemList from "../ProductItemList/ProductItemList";
interface ProductItemSectionProps {
  onError: (error: string) => void;
}

function ProductItemSection({ onError }: ProductItemSectionProps) {
  const [category, setCategory] = useState<Category>("" as Category);
  const [sortingOption, setSortingOption] = useState<Sorting>(
    "price,asc" as Sorting
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
      <ProductItemList
        category={category}
        sortOption={sortingOption}
        onError={onError}
      />
    </S.ProductSectionContainer>
  );
}

export default ProductItemSection;
