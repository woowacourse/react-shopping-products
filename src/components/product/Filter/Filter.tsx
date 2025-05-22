import { CATEGORIES, PRICE_SORTS } from "../../../constants/filterOptions";
import * as Styled from "./Filter.styled";

interface FilterProps {
  handleCategory: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSort: (value: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Filter({ handleCategory, handleSort }: FilterProps) {
  return (
    <Styled.Container>
      <Styled.Select onChange={handleCategory}>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Styled.Select>
      <Styled.Select onChange={handleSort}>
        {Object.entries(PRICE_SORTS).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </Styled.Select>
    </Styled.Container>
  );
}

export default Filter;
