import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

interface SelectProps {
  $isOpen: boolean;
}

interface OptionProps {
  $isOpen: boolean;
  $count: number;
}

interface SelectedTextProps {
  $label: string;
}

interface SelectBoxMapperProps {
  $isOpen: boolean;
  color: Theme['color'];
}

interface SelectOptionMapperProps {
  $isOpen: boolean;
  $count: number;
  color: Theme['color'];
}

const SelectBoxMapper = ({ $isOpen, color }: SelectBoxMapperProps) => {
  if ($isOpen) {
    return {
      border: `1px solid ${color.black}`,
    };
  }

  return {
    border: `1px solid ${color.borderGray}`,
  };
};

const SelectOptionMapper = ({ $isOpen, $count, color }: SelectOptionMapperProps) => {
  if ($isOpen) {
    return {
      height: `${38 * $count}px`,
      border: `1px solid ${color.lightBlack}`,
    };
  }

  return {
    height: 0,
    border: 'none',
  };
};

export const SelectBox = styled.div<SelectProps>`
  position: relative;

  width: 100%;
  padding: 0.5rem 0.5rem;
  border-radius: 0.5rem;
  ${({ $isOpen, theme }) => SelectBoxMapper({ $isOpen, color: theme.color })}

  background-color: ${(props) => props.theme.color.white};

  cursor: pointer;
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  user-select: none;
`;

export const SelectedText = styled.span<SelectedTextProps>`
  margin-left: 0.25rem;

  text-align: center;
  ${(props) => props.theme.typography.selectOption}

  user-select: none;
  cursor: pointer;
`;

export const SelectOptions = styled.ul<OptionProps>`
  position: absolute;
  top: 45px;
  left: 0;

  width: 100%;
  border-radius: 0.5rem;
  ${({ $isOpen, $count, theme }) => SelectOptionMapper({ $isOpen, $count, color: theme.color })}

  background-color: ${(props) => props.theme.color.white};

  color: ${(props) => props.theme.color.black};

  list-style: none;
  overflow: hidden;
  transition: height 0.3s;
  user-select: none;
`;

export const Option = styled.li`
  padding: 0.75rem;

  color: ${(props) => props.theme.color.gray};
  font-size: 0.875rem;

  transition: background-color 0.1s ease-in;
  &:hover {
    background-color: ${(props) => props.theme.color.lightGray};
  }
`;
