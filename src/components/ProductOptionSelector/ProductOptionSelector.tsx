import DropDown from "../_common/DropDown";

import { ProductOptionKeys } from "../../constants/products";

interface ProductOptionSelectorProps<T extends string> {
  type: ProductOptionKeys;
  options: Record<string, string>;
  currentOption: string;
  onChange: (type: ProductOptionKeys, value: T) => void;
}

export default function ProductOptionSelector<T extends string>({
  type,
  options,
  currentOption,
  onChange,
}: ProductOptionSelectorProps<T>) {
  const currentValue = options[currentOption];

  const handleOptionChange = (value: T) => {
    onChange(type, value);
  };

  return (
    <DropDown onChange={handleOptionChange}>
      <DropDown.Trigger value={currentValue} />
      <DropDown.Menu>
        {Object.entries(options).map(([key, value]) => (
          <DropDown.Item
            key={key}
            id={key}
            isSelected={value === currentValue}
          >
            {value}
          </DropDown.Item>
        ))}
      </DropDown.Menu>
    </DropDown>
  );
}
