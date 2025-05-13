import styled from '@emotion/styled';

interface CustomSelectProps {
  items: Array<{
    label: string;
    value: string;
  }>;
}

export default function CustomSelect({items}: CustomSelectProps) {
  return (
    <StyledCustomSelect>
      {items.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </StyledCustomSelect>
  );
}

const StyledCustomSelect = styled.select`
  width: 125px;
  height: 36px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;

  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;
