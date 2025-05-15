import Title from '../Title/Title';
import Dropdown from '../Dropdown/Dropdown';
import ProductList from '../ProductList/ProductList';
import { DropdownContainer, Section } from './ProductSection.styles';
import { CATEGORY, SORT_PRICE } from '../../../constants/productConfig';
import { SortType, CategoryType } from '../../../types/product';

interface ProductSectionProps {
  data: any;
  sort: SortType;
  category: CategoryType;
  onFilter: () => void;
  onSort: () => void;
  onAddCart: () => void;
  onRemoveCart: () => void;
}

function ProductSection({
  data,
  sort,
  category,
  onFilter,
  onSort,
  onAddCart,
  onRemoveCart,
}: ProductSectionProps) {
  return (
    <Section>
      <Title title="bpple 상품 목록" />
      <DropdownContainer>
        <Dropdown value={category} options={CATEGORY} onChange={onFilter} />
        <Dropdown value={sort} options={SORT_PRICE} onChange={onSort} />
      </DropdownContainer>
      <ProductList
        onAddCart={onAddCart}
        onRemoveCart={onRemoveCart}
        data={data}
      />
    </Section>
  );
}

export default ProductSection;
