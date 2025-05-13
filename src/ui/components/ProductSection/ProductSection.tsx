import Title from '../Title/Title';
import Product from '../Product/Product';
import { DropdownContainer, Section } from './ProductSection.styles';
import Dropdown from '../Dropdown/Dropdown';
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
      <Product name="양말" price="2000" imgSrc="./cart_default.png" />
    </Section>
  );
}

export default ProductSection;
