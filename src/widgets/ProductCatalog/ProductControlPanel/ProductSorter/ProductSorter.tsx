import { sortOptions } from "../../../../features/product/config/filter";
import { useProduct } from "../../../../features/product/hooks/useProduct";
import SelectBox from "../../../../shared/ui/SelectBox/SelectBox";

const ProductSorter = () => {
  const { sort } = useProduct();

  return (
    <SelectBox value={sort.value} onChange={sort.set} options={sortOptions} />
  );
};

export default ProductSorter;
