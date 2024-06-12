import { Option } from '../../types/Option.type';
import { findByKey } from '../../utils/option';
import * as S from '../Dropdown/Dropdown.style';

interface DropdownProps {
  options: Option[];
  selectedOption: Option;
  updateOption: (option: Option) => void;
}

const Dropdown = ({ options, selectedOption, updateOption }: DropdownProps) => {
  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = findByKey(e.target.value, options);

    if (newOption) {
      updateOption(newOption);
    }
  };

  return (
    <S.Layout>
      <S.Select value={selectedOption.key} onChange={handleOptionChange}>
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.name}
          </option>
        ))}
      </S.Select>
    </S.Layout>
  );
};

export default Dropdown;
