import SelectBox from "../@common/SelectBox/SelectBox";

const CategoryFilter = () => {
  const options = ["전체", "식료품", "패션잡화"];
  return <SelectBox options={options} />;
};

export default CategoryFilter;
