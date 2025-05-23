import { CATEGORY } from '../../constants/products';
import SelectBox from '../common/SelectBox/SelectBox';
import { selectBoxContainer } from './Filter.style';

export const SORT: { [key: string]: string } = {
  '낮은 가격 순': 'asc',
  '높은 가격 순': 'desc',
};

function Filter({
  onChangeCategory,
  onChangeSort,
}: {
  onChangeCategory: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSort: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={selectBoxContainer}>
      <SelectBox placeHolder={CATEGORY[0]} options={CATEGORY} onChange={onChangeCategory} />
      <SelectBox
        placeHolder={Object.keys(SORT)[0]}
        options={Object.keys(SORT)}
        onChange={onChangeSort}
      />
    </div>
  );
}

export default Filter;
