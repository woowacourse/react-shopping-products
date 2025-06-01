import { css } from "@emotion/react";
import Select from "../components/common/Select";
import ProductList from "../components/Product/ProductList";
import { OPTION } from "../constants";
import Text from "../components/common/Text";
import useProducts from "../hooks/useProducts";

const ProductPage = () => {
  const { products, filter, setFilter, sort, setSort } = useProducts();

  return (
    <>
      <div css={containerStyle}>
        <Text variant="title-1">호이초이의 상품 목록</Text>
        <div css={selectBoxStyle}>
          <Select options={OPTION.FILTER} selectedItem={filter} setSelectedItem={setFilter} />
          <Select options={OPTION.SORT} selectedItem={sort} setSelectedItem={setSort} />
        </div>
        <ProductList products={products} />
      </div>
    </>
  );
};

export default ProductPage;

const containerStyle = css`
  padding: 36px 0;
  display: flex;
  height: calc(100% - 64px);
  flex-direction: column;
  gap: 28px;

  > * {
    padding: 0 24px;
  }
`;

const selectBoxStyle = css`
  display: flex;
  justify-content: space-between;
  gap: 132px;
`;
