import SelectBox from "../@common/SelectBox/SelectBox";

const ProductSorter = () => {
  const options = ["낮은 가격 순", "높은 가격 순"];
  return <SelectBox options={options} />;
};

export default ProductSorter;
