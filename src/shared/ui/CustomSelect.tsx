import * as S from './CustomSelect.styles';

interface CustomSelectProps {
  items: Array<{
    label: string;
    value: string;
  }>;
}

export default function CustomSelect({ items }: CustomSelectProps) {
  return (
    <S.CustomSelect>
      {items.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </S.CustomSelect>
  );
}
