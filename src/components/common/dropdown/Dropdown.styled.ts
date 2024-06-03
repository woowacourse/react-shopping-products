import styled from '@emotion/styled';

interface SelectProps {
  $isOpen: boolean;
}

interface OptionProps {
  $isOpen: boolean;
  $count: number;
}

interface SelectedTextProps {
  $value: string;
}

export const SelectBox = styled.div<SelectProps>`
  position: relative;

  width: 100%;
  padding: 0.75rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => (props.$isOpen ? 'black' : '#acacac')};

  background-color: #ffffff;

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
  font-size: 0.875rem;

  user-select: none;
  cursor: pointer;
`;

export const SelectOptions = styled.ul<OptionProps>`
  position: absolute;
  top: 45px;
  left: 0;

  width: 100%;
  height: ${(props) => (props.$isOpen ? `${38 * props.$count}px` : '0')};
  border: 1px solid ${(props) => (props.$isOpen ? '#acacac' : 'none')};
  border-radius: 0.5rem;

  background-color: white;

  color: black;

  list-style: none;
  overflow: hidden;
  transition: height 0.3s;
  user-select: none;
`;

export const Option = styled.li`
  padding: 0.75rem;

  color: #4f4f4f;
  font-size: 0.875rem;

  transition: background-color 0.1s ease-in;
  &:hover {
    background-color: rgba(200, 200, 200, 0.4);
  }
`;
