import * as S from './style';

import { useContext } from 'react';

import Dropdown from '../common/Dropdown';
import { UseProductsContext } from '../ShoppingProductsPage';

import { CATEGORY, PRICE_SORT } from '../../constants/filter';

const FilterContainer = () => {
  const { category, priceOrder, handleCategoryChange, handlePriceOrderChange } =
    useContext(UseProductsContext);

  const selectedCategoryOption = Object.entries(CATEGORY).find(
    ([, value]) => value === category,
  )![0];
  const selectedPriceOrderOption = Object.entries(PRICE_SORT).find(
    ([, value]) => value === priceOrder,
  )![0];

  return (
    <S.FilterContainer>
      <Dropdown
        optionArray={Object.keys(CATEGORY)}
        selectedOption={selectedCategoryOption}
        optionChange={(option) => handleCategoryChange(CATEGORY[option])}
      />
      <Dropdown
        optionArray={Object.keys(PRICE_SORT)}
        selectedOption={selectedPriceOrderOption}
        optionChange={(option) => handlePriceOrderChange(PRICE_SORT[option])}
      />
    </S.FilterContainer>
  );
};

export default FilterContainer;
