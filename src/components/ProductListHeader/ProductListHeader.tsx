import * as PLH from "./ProductListHeader.style";

const ProductListHeader = () => {
  return (
    <PLH.Header>
      <h2>bpple 상품 목록</h2>
      <PLH.SelectBoxGroup>
        <PLH.SelectBox name="" id="">
          <option value="">전체</option>
        </PLH.SelectBox>
        <PLH.SelectBox name="" id="">
          <option value="">낮은 가격순</option>
        </PLH.SelectBox>
      </PLH.SelectBoxGroup>
    </PLH.Header>
  );
};

export default ProductListHeader;
