import BaseDropDown from './BaseDropDown';
import { CATEGORY_LIST } from '@/constants/productList';

interface Props {
  onChangeCategory: (category: string) => void;
}

const FilterCategory = ({ onChangeCategory }: Props) => {
  const categoryOptions = CATEGORY_LIST;
  return (
    <BaseDropDown
      initialValue="전체"
      options={categoryOptions}
      onChangeSelect={onChangeCategory}
    />
  );
};

export default FilterCategory;
