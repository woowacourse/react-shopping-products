import Title from '../Title/Title';
import Dropdown from '../Dropdown/Dropdown';
import ProductList from '../ProductList/ProductList';
import { DropdownContainer, Section } from './ProductSection.styles';
import { CATEGORY, SORT_PRICE } from '../../../constants/productConfig';

function ProductSection() {
  return (
    <Section>
      <Title title="bpple 상품 목록" />
      <DropdownContainer>
        <Dropdown value="전체" options={CATEGORY} onChange={() => {}} />
        <Dropdown
          value="낮은 가격 순"
          options={SORT_PRICE}
          onChange={() => {}}
        />
      </DropdownContainer>
      <ProductList />
    </Section>
  );
}

export default ProductSection;
