import { ComponentProps } from 'react';
import styled from '@emotion/styled';

type Category = {
  name: string;
};

interface SelectBoxProps {
  category: Category[];
}

export default function SelectBox({
  category,
  ...props
}: SelectBoxProps & ComponentProps<'select'>) {
  return (
    <StyledSelect {...props}>
      {category.map(({ name }) => (
        <option value={name} key={name}>
          {name}
        </option>
      ))}
    </StyledSelect>
  );
}

const StyledSelect = styled.select`
  width: 125px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #0000001a;
  padding: 8px;
`;
