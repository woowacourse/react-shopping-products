import BaseDropDown from './BaseDropDown';
import { SORT_ORDER } from '@/constants/productList';

interface Props {
  onChangeOrder: (order: string) => void;
}

const SortOrder = ({ onChangeOrder }: Props) => {
  const sortOptions = SORT_ORDER;

  return (
    <BaseDropDown
      initialValue="낮은 가격순"
      options={sortOptions}
      onChangeSelect={onChangeOrder}
    />
  );
};

export default SortOrder;
