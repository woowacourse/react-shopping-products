export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  className?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

export const Select = ({
  className,
  options,
  value,
  onChange,
}: SelectProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select className={className} value={value} onChange={handleOnChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
